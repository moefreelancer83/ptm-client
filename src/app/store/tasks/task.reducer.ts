import { createReducer, on } from '@ngrx/store';

import { Task } from '@_/models/task.model';
import { TaskActions } from './task.actions';

export interface TaskState {
  tasks: ReadonlyArray<Task>;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialTaskState: TaskState = {
  tasks: [],
  error: null,
  status: 'pending',
};

export const taskReducer = createReducer(
  initialTaskState,
  on(TaskActions.addTask, (state, { task }) => {
    console.log('adding new task ...');
    return { ...state, tasks: [...state.tasks, task] };
  }),
  on(TaskActions.removeTask, (state, { id }) => {
    console.log('removing task ...');
    return { ...state, tasks: state.tasks.filter((task) => task.id !== id) };
  }),
  on(TaskActions.updateTask, (state, { task }) => {
    console.log('updatingg a task ...');
    const updatedTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    return { ...state, tasks: updatedTasks };
  })
);
