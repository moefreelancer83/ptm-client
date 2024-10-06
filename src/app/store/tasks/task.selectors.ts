import { createSelector } from '@ngrx/store';
import { AppState } from '@_store/app.state';
import { TaskState } from './task.reducer';

export const selectTasks = (state: AppState) => state.tasks;

export const selectTaskById = (id: string) =>
  createSelector(selectTasks, (taskState) =>
    taskState.tasks.find((task) => (task.id = id))
  );
export const selectAllTasks = () =>
  createSelector(selectTasks, (state: TaskState) => state.tasks);
