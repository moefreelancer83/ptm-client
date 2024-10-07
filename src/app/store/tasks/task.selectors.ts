import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '@_store/app.state';
import { TaskState, Status } from '@_store/tasks/task.reducer';

// Select the task state from the app state
// export const selectTaskState = (state: AppState) => state.tasks;
export const selectTaskState = createFeatureSelector<AppState, TaskState>(
  'tasks'
);

// Select all tasks
export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => {
    console.log('selectAllTasks called with state:', state);
    return state?.tasks;
  }
);

export const selectTaskById = (id: string) =>
  createSelector(selectAllTasks, (tasks) =>
    tasks.find((task) => task.id === id)
  );

export const selectTaskError = createSelector(
  selectTaskState,
  (state: TaskState) => state?.error
);

export const selectTaskStatus = createSelector(
  selectTaskState,
  (state: TaskState) => state?.status
);

export const selectTasksLoading = createSelector(
  selectTaskStatus,
  (status: Status) => status === Status.LOADING
);
