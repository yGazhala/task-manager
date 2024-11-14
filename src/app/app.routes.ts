import { Routes } from '@angular/router';
import {TaskListComponent} from "./task-list/task-list.component";
import {AddTaskComponent} from "./add-task/add-task.component";

export const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddTaskComponent
  }
];
