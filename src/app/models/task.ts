import { TaskCategory } from './task-category';
import { TaskData, LearningTaskData, WorkingTaskData } from './task-data';

interface Searchable {
  searchIndex: string;
}

export abstract class BaseTask implements Searchable {
  public abstract title: string;
  public abstract category: TaskCategory;
  public abstract description?: string;

  public abstract id: string;
  public abstract searchIndex: string;

  public abstract showDetails(): void;
  public abstract getData(): TaskData;

  protected detailsHTML: string = '';
  private isCompleted: boolean = false;

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
  public title: string;
  public category: TaskCategory = 'workingTask';
  public description: string;
  public id: string;
  public searchIndex: string;

  private projectName: string;
  private projectContactFullName: string;
  private dateToComplete?: string; // YYYY-MM-DD

  constructor(taskData: WorkingTaskData) {
    super();
    this.title = taskData.title;
    this.description = taskData.description;
    this.id = taskData.id;
    this.projectName = taskData.projectName;
    this.projectContactFullName = taskData.projectContactFullName;
    this.dateToComplete = taskData.dateToComplete;
    this.searchIndex = `${taskData.title.toLowerCase()} ${taskData.description.toLowerCase()}`;
  }

  public override showDetails() {
    this.detailsHTML = `
      <p>Категорія: робоче завдання</p>
      <p>Проєкт: ${this.projectName}</p>
      <p>Контактна особоа: ${this.projectContactFullName}</p>
      <p>Виконати до: ${this.dateToComplete || '--'}</p>
    `;
  }

  public override getData(): WorkingTaskData {
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
  public title: string;
  public category: TaskCategory = 'learningTask';
  public description?: string;
  public id: string;
  public searchIndex: string;

  private topic: string;
  private linkURL?: string;

  constructor(taskData: LearningTaskData) {
    super();
    this.id = taskData.id;
    this.title = taskData.title;
    this.description = taskData.description;
    this.topic = taskData.topic;
    this.linkURL = taskData.linkURL;
    this.searchIndex = `${taskData.title.toLowerCase()} ${taskData.description.toLowerCase()}`;
  }

  public showDetails() {
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
