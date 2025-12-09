import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');

export const selectAllTasks = createSelector(
  selectTasksState,
  (state) => state.tasks
);

export const selectUserTasks = (userId: string) => createSelector(
  selectAllTasks,
  (tasks) => tasks.filter(t => t.userId === userId)
);

export const selectActiveTasks = (userId: string) => createSelector(
  selectUserTasks(userId),
  (tasks) => tasks.filter(t => !t.completed)
);

export const selectCompletedTasks = (userId: string) => createSelector(
  selectUserTasks(userId),
  (tasks) => tasks.filter(t => t.completed)
);
