import { BaseTask, LearningTask, WorkingTask}  from './task';
import { LearningTaskData, TaskData, WorkingTaskData } from './task-data';
import { TaskListStorageService } from './task-list-storage.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskListService {
  public searchedItems: BaseTask[];

  private items: BaseTask[];
  private currentSearchTerm: string = '';

  constructor(private storageService: TaskListStorageService) {
    this.items = [];

    // Заповнюємо масив items даними зі сховища
    const listData: TaskData[] = this.storageService.getListData();
    listData.forEach((taskData: TaskData) => {
      let task: BaseTask;
      if (taskData.category === 'workingTask') {
        task = new WorkingTask(taskData as WorkingTaskData);
      } else {
        task = new LearningTask(taskData as LearningTaskData);
      }
      this.items.push(task);
    });

    // Відображаємо всі елементи за замовчуванням
    this.searchedItems = this.items;
  }

  public search(searchTerm: string): void {
    // Зберігаємо поточний пошуковий запит в атрибут класу
    this.currentSearchTerm = searchTerm;
    if (searchTerm) {
      let searchTermLowerCased = searchTerm.toLowerCase();
      this.searchedItems = this.items.filter((item) => {
        return item.searchIndex.includes(searchTermLowerCased);
      });
    } else {
      // Відображаємо всі елементи якщо відсутній пошуковий запит
      this.searchedItems = this.items;
    }
  }

  public addItem(taskData: TaskData): void {
    // Додаємо завдання до списку
    let task: BaseTask;
    if (taskData.category === 'workingTask') {
      task = new WorkingTask(taskData as WorkingTaskData);
    } else {
      task = new LearningTask(taskData as LearningTaskData);
    }
    this.items.push(task);

    // Оновлюємо список з результатами пошуку використовуючи поточний пошуковий запит
    this.search(this.currentSearchTerm);

    // Зберігаємо дані списку в сховищі
    this.saveListDataToStorage();
  }

  public removeItem(itemId: string): void {
    this.items = this.items.filter((item) => item.id !== itemId);
    this.search(this.currentSearchTerm);
    this.saveListDataToStorage();
  }

  private saveListDataToStorage(): void {
    // Отримуємо дані кожного елемента списку та зберігаємо їх в новий масив
    const listData: TaskData[] = this.items.map((item: BaseTask) => item.getData());
    this.storageService.setListData(listData);
  }
}
