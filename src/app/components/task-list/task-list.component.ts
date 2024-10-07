import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '@_/models/task.model';
import {
  selectAllTasks,
  selectTaskError,
  selectTasksLoading,
  selectTaskStatus,
} from '@_store/tasks/task.selectors';
import { TaskActions } from '@_store/tasks//task.actions';
import { AppState } from '@_store/app.state';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<Task>>;
  status$: Observable<string>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.status$ = this.store.select(selectTaskStatus);
    this.error$ = this.store.select(selectTaskError);
  }

  displayedColumns: string[] = [
    'title',
    'description',
    'deadline',
    'completed',
    'actions',
  ];

  ngOnInit() {
    console.log('TaskListComponent: Dispatching loadTasks action');
    this.store.dispatch(TaskActions.loadTasks());

    // Temporary debugging
    this.store.subscribe((state) => {
      console.log('Current store state:', state);
    });

    this.tasks$.subscribe((tasks) => {
      console.log('Tasks in component:', tasks);
    });

    this.status$.subscribe((status) => {
      console.log('Status in component:', status);
    });
  }

  onDeleteTask(id: string) {
    this.store.dispatch(TaskActions.removeTask({ id }));
  }

  onToggleComplete(id: string, task: Task) {
    this.store.dispatch(
      TaskActions.updateTask({
        task: { ...task, completed: !task.completed },
      })
    );
  }
}
