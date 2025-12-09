import { createReducer, on } from '@ngrx/store';
import { Task } from '../../models/task.model';
import * as TasksActions from './tasks.actions';

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: []
};

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(TasksActions.updateTask, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),
  on(TasksActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  on(TasksActions.toggleTaskComplete, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  })),
  on(TasksActions.clearTasks, () => initialState)
);
