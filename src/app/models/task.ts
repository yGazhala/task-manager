import { TaskCategory, TaskData, LearningTaskData, WorkingTaskData } from './task-data';

interface Searchable {
  searchIndex: string;
}

export abstract class BaseTask implements Searchable {
  public id: string;
  public title: string;
  public searchIndex: string;

  // Абстрактні атрибути і методи мають бути реалізовані в класах-нащадках
  public abstract category: TaskCategory;
  public abstract description?: string;

  public abstract showDetails(): void;
  public abstract getData(): TaskData;

  protected detailsHTML: string = '';
  private isCompleted: boolean = false;

  constructor(taskData: TaskData) {
    this.title = taskData.title;
    this.id = taskData.id;
    // Ініціалізуємо атрибут searchIndex для реалізації інтейрфейсу Searchable
    this.searchIndex = taskData.title.toLowerCase();
  }

  public getDetailsHTML(): string {
    return this.detailsHTML;
  }

  public isDetailsShown(): boolean {
    return this.detailsHTML.length > 0;
  }

  public hideDetails(): void {
    this.detailsHTML = '';
  };

  public toggleDetails(): void {
    if(this.isDetailsShown()) {
      this.hideDetails();
    } else {
      this.showDetails();
    }
  }

  public isDone(): boolean {
    return this.isCompleted;
  }

  public markAsDone(): void {
    this.isCompleted = true;
  }
}

export class WorkingTask extends BaseTask {
  public category: TaskCategory = 'workingTask';
  public description: string;

  private projectName: string;
  private projectContactFullName: string;
  private dateToComplete?: string; // YYYY-MM-DD

  constructor(taskData: WorkingTaskData) {
    // викликаємо конструктор батьківського класу BaseTask
    super(taskData);
    this.description = taskData.description;
    this.projectName = taskData.projectName;
    this.projectContactFullName = taskData.projectContactFullName;
    this.dateToComplete = taskData.dateToComplete;
  }

  public showDetails(): void {
    this.detailsHTML = `
      <p>Категорія: робоче завдання</p>
      <p>Проєкт: ${this.projectName}</p>
      <p>Контактна особоа: ${this.projectContactFullName}</p>
      <p>Виконати до: ${this.dateToComplete || '--'}</p>
    `;
  }

  public getData(): WorkingTaskData {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      description: this.description,
      projectName: this.projectName,
      projectContactFullName: this.projectContactFullName,
      dateToComplete: this.dateToComplete,
    }
  }
}

export class LearningTask extends BaseTask {
  public category: TaskCategory = 'learningTask';
  public description?: string;

  private topic: string;
  private linkURL?: string;

  constructor(taskData: LearningTaskData) {
    super(taskData);
    this.description = taskData.description;
    this.topic = taskData.topic;
    this.linkURL = taskData.linkURL;
  }

  public showDetails(): void {
    let details = `
      <p>Категорія: навчальне завдання</p>
      <p>Тема: ${this.topic}</p>
    `;
    if (this.linkURL) {
      details += `<p><a href="${this.linkURL}" target="_blank">Посилання</a></p>`
    }
    this.detailsHTML = details;
  }

  public getData(): LearningTaskData {
    return {
      title: this.title,
      category: this.category,
      description: this.description,
      id: this.id,
      topic: this.topic,
      linkURL: this.linkURL,
    }
  }
}
