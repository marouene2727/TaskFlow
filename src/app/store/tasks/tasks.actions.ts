import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: string }>()
);

export const toggleTaskComplete = createAction(
  '[Tasks] Toggle Complete',
  props<{ id: string }>()
);

export const clearTasks = createAction('[Tasks] Clear Tasks');
