import { createReducer, on } from '@ngrx/store';

import { Task } from '@_/models/task.model';
import { TaskActions } from './task.actions';

export enum Status {
  PENDING = 'pending',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}
export interface TaskState {
  tasks: ReadonlyArray<Task>;
  error: string | null;
  status: Status;
}

export const initialTaskState: TaskState = {
  tasks: [],
  error: null,
  status: Status.PENDING,
};

export const taskReducer = createReducer(
  initialTaskState,
  // on(TaskActions.addTask, (state, { task }) => {
  //   console.log('adding new task ...');
  //   return { ...state, tasks: [...state.tasks, task] };
  // }),
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
    status: Status.SUCCESS,
    error: null,
  })),
  on(TaskActions.addTaskFail, (state, { error }) => ({
    ...state,
    error,
    status: Status.ERROR,
  })),

  // on(TaskActions.removeTask, (state, { id }) => {
  //   console.log('removing task ...');
  //   return { ...state, tasks: state.tasks.filter((task) => task.id !== id) };
  // }),
  on(TaskActions.removeTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
    status: Status.SUCCESS,
    error: null,
  })),
  on(TaskActions.removeTaskFail, (state, { error }) => ({
    ...state,
    error,
    status: Status.ERROR,
  })),

  // on(TaskActions.updateTask, (state, { task }) => {
  //   console.log('updatingg a task ...');
  //   const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
  //   return { ...state, tasks: updatedTasks };
  // }),
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    status: Status.SUCCESS,
    error: null,
  })),
  on(TaskActions.updateTaskFail, (state, { error }) => ({
    ...state,
    error,
    status: Status.ERROR,
  })),

  // on(TaskActions.loadTasks, (state) => {
  //   console.log('loading tasks ...');
  //   return { ...state, status: Status.LOADING };
  // }),
  on(TaskActions.loadTasksFail, (state, { error }) => ({
    ...state,
    error,
    status: Status.ERROR,
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    error: null,
    status: Status.SUCCESS,
  }))
);
