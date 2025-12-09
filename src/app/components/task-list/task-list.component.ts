import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import * as AuthActions from '../../store/auth/auth.actions';
import * as TasksActions from '../../store/tasks/tasks.actions';
import { selectCurrentUser } from '../../store/auth/auth.selectors';
import { selectActiveTasks, selectCompletedTasks } from '../../store/tasks/tasks.selectors';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  currentUser$: Observable<User | null>;
  activeTasks$!: Observable<Task[]>;
  completedTasks$!: Observable<Task[]>;
  showTaskForm = false;
  selectedTask: Task | null = null;
  currentUserId = '';

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit() {
    this.currentUser$.subscribe(user => {
      if (user) {
        this.currentUserId = user.email;
        this.activeTasks$ = this.store.select(selectActiveTasks(this.currentUserId));
        this.completedTasks$ = this.store.select(selectCompletedTasks(this.currentUserId));
      }
    });
  }

  openAddTaskForm() {
    this.selectedTask = null;
    this.showTaskForm = true;
  }

  onEditTask(task: Task) {
    this.selectedTask = task;
    this.showTaskForm = true;
  }

  closeTaskForm() {
    this.showTaskForm = false;
    this.selectedTask = null;
  }

  onSaveTask(taskData: Partial<Task>) {
    if (this.selectedTask) {
      this.store.dispatch(TasksActions.updateTask({
        task: { ...this.selectedTask, ...taskData }
      }));
    } else {
      const newTask: Task = {
        ...taskData as Task,
        id: Date.now().toString(),
        userId: this.currentUserId,
        completed: false
      };
      this.store.dispatch(TasksActions.addTask({ task: newTask }));
    }
    this.closeTaskForm();
  }

  onToggleComplete(id: string) {
    this.store.dispatch(TasksActions.toggleTaskComplete({ id }));
  }

  onDeleteTask(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.store.dispatch(TasksActions.deleteTask({ id }));
    }
  }

  onLogout() {
    this.store.dispatch(TasksActions.clearTasks());
    this.store.dispatch(AuthActions.logout());
  }
}
