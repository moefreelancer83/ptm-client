import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '@_/models/task.model';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    addTask: props<{ task: Omit<Task, 'id' | 'completed'> }>(),
    addTaskSuccess: props<{ task: Task }>(),
    addTaskFail: props<{ error: string }>(),

    removeTask: props<{ id: string }>(),
    removeTaskSuccess: props<{ id: string }>(),
    removeTaskFail: props<{ error: string }>(),

    updateTask: props<{ task: Task }>(),
    updateTaskSuccess: props<{ task: Task }>(),
    updateTaskFail: props<{ error: string }>(),

    loadTasks: emptyProps(),
    loadTasksSuccess: props<{ tasks: Task[] }>(),
    loadTasksFail: props<{ error: string }>(),
  },
});

//TODO: define actions for effects, such as loading, success and failures
