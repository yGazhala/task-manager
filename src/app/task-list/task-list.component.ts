import { Component } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
import { TaskComponent } from "../task/task.component";
import { TaskListService } from "../services/task-list.service";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  // Еземпляри класів TaskListService та Router впроваджується 
  // за допомогою механізму впровадження залежностей в Angular
  constructor(
    public list: TaskListService,
    private router: Router,
  ) {}

  // Викликається при натисканні на кнопку "Додати"
  public onAddTask(): void {
    this.router.navigate(['/add']);
  }

  // Викликається при надходженні події від дочірнього компонента
  public onRemoveTask(itemId: string): void {
    const isConfirmed = confirm('Будь ласка, підтвердіть видалення завдання');
    if (isConfirmed) {
      this.list.removeItem(itemId);
    }
  }

  // Викликається при зміні пошукового запиту від користувача
  public onSearchInputChanged(inputEvent: any): void {
    const searchTerm = inputEvent.target.value;
    this.list.search(searchTerm);
  }
}
