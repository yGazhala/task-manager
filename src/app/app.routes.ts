import { Routes } from '@angular/router';
import {TaskListComponent} from "./components/task-list/task-list.component";
import {AddTaskComponent} from "./components/add-task/add-task.component";

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
