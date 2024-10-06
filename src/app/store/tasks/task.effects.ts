import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskActions } from './task.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { TaskService } from '@_services/task.service';
import { AppState } from '@_store/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class TaskEffects {
  loadTasks$;
  saveTask$;
  removeTask$;
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {
    console.log('TaskEffects constructed');

    this.loadTasks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.loadTasks),
        switchMap(() =>
          from(this.taskService.getTasks()).pipe(
            map((tasks) => TaskActions.loadTasksSuccess({ tasks: tasks })),
            catchError((error) => of(TaskActions.loadTasksFail({ error })))
          )
        )
      )
    );

    this.saveTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.addTask),
        tap((action) => console.log('Effect caught addTask action:', action)),
        switchMap((action) =>
          this.taskService.addTask(action.task).pipe(
            map((newTask) => TaskActions.addTaskSuccess({ task: newTask })),
            catchError((error) => of(TaskActions.addTaskFail({ error })))
          )
        )
      )
    );

    this.removeTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.removeTask),
        switchMap((action) =>
          this.taskService.deleteTask(action.id).pipe(
            map(() => TaskActions.removeTaskSuccess({ id: action.id })),
            catchError((error) => of(TaskActions.removeTaskFail({ error })))
          )
        )
      )
    );
  }
}
