import { createAction, createActionGroup, props } from '@ngrx/store';
import { Task } from '@_/models/task.model';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    addTask: props<{ task: Task }>(),
    removeTask: props<{ id: string }>(),
    updateTask: props<{ task: Task }>(),
  },
});

//TODO: define actions for effects, such as loading, success and failures
