import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { TaskListService } from '../../models/task-list.service';
import { AddLearningTaskForm, AddTaskForm, AddWorkingTaskForm } from '../../models/add-task-form';
import { TaskCategory, TaskData } from '../../models/task-data';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {
  // За замовчування відображаємо форму для створення робочого завдання
  public selectedTaskCategory: TaskCategory = 'workingTask';

  public workingTaskForm: AddWorkingTaskForm;
  public learningTaskForm: AddLearningTaskForm;

  // Еземпляр класу TaskListService впроваджується за допомогою механізму впровадження залежностей в Angular
  constructor(private list: TaskListService, private router: Router) {}

  public ngOnInit() {
    // Ініціалізуємо обʼекти-екземпляри форм
    this.workingTaskForm = new AddWorkingTaskForm();
    this.learningTaskForm = new AddLearningTaskForm();
  }

  // Викликається, коли користувач натискає кнопку збереження на формі
  public save(): void {
    const currentForm = this.getCurrentForm();
    const taskData: TaskData = currentForm.getData();
    this.list.addItem(taskData);
    this.router.navigate(['/']);
  }

  private getCurrentForm(): AddTaskForm {
    if (this.selectedTaskCategory == 'workingTask') {
      return this.workingTaskForm;
    }
    return this.learningTaskForm;
  }
}
