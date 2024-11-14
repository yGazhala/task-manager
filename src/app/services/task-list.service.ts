// Імпортуємо класи і типи створені в попередній лабораторній роботі
import {
  TaskCategory, BaseTask, WorkingTask, WorkingTaskData,
  SelfLearningTask, SelfLearningTaskData
} from '../models/task';

// Імпортуємо Angular декоратор
import { Injectable } from '@angular/core';

// Тип обʼєкту, що містить дані елементу списку для зберігання в сховищі
type TaskDataInStorage = {
  category: TaskCategory;
  // WorkingTaskData або LearningTaskData
  taskDataJSON: string;
}

// Додаємо Angular декоратор, що  визначає цей клас як Angular сервіс
// для механізму впровадження залежностей
@Injectable({ providedIn: 'root' })
export class TaskListService {
  public searchedItems: BaseTask[];

  private items: BaseTask[];
  private currentSearchTerm: string = '';
  private storageKey = 'taskList';

  constructor() {
    this.items = [];
    this.searchedItems = this.items;

    // Заповнюємо масив items даними зі сховища
    const listDataInStorageJSON: string = localStorage.getItem(this.storageKey);
    if (listDataInStorageJSON) {
      let tasksInStorage: TaskDataInStorage[] = JSON.parse(listDataInStorageJSON);
      for (let i = 0; i < tasksInStorage.length; i++) {
        const taskData = tasksInStorage[i];
        let task: BaseTask;
        if (taskData.category === 'workingTask') {
          task = new WorkingTask(taskData.taskDataJSON);
        } else {
          task = new SelfLearningTask(taskData.taskDataJSON);
        }
        this.items.push(task);
      }
    }
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

  public addItem(taskDataJSON: string): void {
    const taskData: WorkingTaskData | SelfLearningTaskData = JSON.parse(taskDataJSON);

    // Додаємо завдання до списку
    let task: BaseTask;
    if (taskData.category === 'workingTask') {
      task = new WorkingTask(taskDataJSON);
    } else {
      task = new SelfLearningTask(taskDataJSON);
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
    const tasksInStorage: TaskDataInStorage[] = [];
    for (let i = 0; i < this.items.length; i++) {
      const task = this.items[i];
      const taskData: TaskDataInStorage = {
        category: task.category,
        taskDataJSON: task.toJSON()
      }
      tasksInStorage.push(taskData);
    }

    const tasksInStorageJSON = JSON.stringify(tasksInStorage);
    localStorage.setItem(this.storageKey, tasksInStorageJSON);
  }
}


