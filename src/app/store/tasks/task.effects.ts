import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskActions } from './task.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { TaskService } from '@_services/task.service';
import { AppState } from '@_store/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class TaskEffects {
  loadTasks$;
  saveTask$;
  removeTask$;
  updateTask$;

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {
    console.log('TaskEffects constructed');

    this.loadTasks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.loadTasks),
        mergeMap(() =>
          this.taskService.getTasks().pipe(
            map((tasks) => {
              return TaskActions.loadTasksSuccess({ tasks: tasks });
            }),
            catchError((error) => {
              return of(TaskActions.loadTasksFail({ error: error.message }));
            })
          )
        )
      )
    );

    this.saveTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.addTask),
        mergeMap((action) =>
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
        mergeMap((action) =>
          this.taskService.deleteTask(action.id).pipe(
            map(() => TaskActions.removeTaskSuccess({ id: action.id })),
            catchError((error) => of(TaskActions.removeTaskFail({ error })))
          )
        )
      )
    );

    this.updateTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TaskActions.updateTask),
        mergeMap((action) =>
          this.taskService.updateTask(action.task).pipe(
            map((updatedTask) =>
              TaskActions.updateTaskSuccess({ task: updatedTask })
            ),
            catchError((error) => of(TaskActions.updateTaskFail({ error })))
          )
        )
      )
    );
  }
}
