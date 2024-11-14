export type TaskCategory = 'selfLearningTask' | 'workingTask';

interface ListItem {
  id: string;
  searchIndex: string;
}

export abstract class BaseTask implements ListItem {
  public abstract title: string;
  public abstract category: TaskCategory;
  public abstract description?: string;
  
  public abstract id: string;
  public abstract searchIndex: string;

  public abstract toJSON(): string;
  public abstract showDetails(): void;

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

export type WorkingTaskData = {
  category: TaskCategory;
  id: string;
  title: string;
  description: string;
  projectName: string;
  projectContactFullName: string;
  dateToComplete?: string;
}

export type SelfLearningTaskData = {
  category: TaskCategory;
  id: string;
  title: string;
  description?: string;
  topic: string;
  linkURL?: string;
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

  constructor(taskDataJSON: string) {
    super();
    let taskData: WorkingTaskData = JSON.parse(taskDataJSON);
    this.title = taskData.title;
    this.description = taskData.description;
    this.id = taskData.id;
    this.searchIndex =
      `${taskData.title.toLowerCase()} ${taskData.description.toLowerCase()}`;
    this.projectName = taskData.projectName;
    this.projectContactFullName = taskData.projectContactFullName;
    this.dateToComplete = taskData.dateToComplete;
  }

  public override showDetails() {
    this.detailsHTML = `
      <p>Категорія: робоче завдання</p>
      <p>Проєкт: ${this.projectName}</p>
      <p>Контактна особоа: ${this.projectContactFullName}</p>
      <p>Виконати до: ${this.dateToComplete || '--'}</p>
    `;
  }

  public override toJSON(): string {
    let taskData: WorkingTaskData = {
      title: this.title,
      category: this.category,
      description: this.description,
      id: this.id,
      projectName: this.projectName,
      projectContactFullName: this.projectContactFullName,
      dateToComplete: this.dateToComplete,
    }
    return JSON.stringify(taskData);
  }
}

export class SelfLearningTask extends BaseTask {
  public title: string;
  public category: TaskCategory = 'selfLearningTask';
  public description?: string;
  public id: string;
  public searchIndex: string;

  private topic: string;
  private linkURL?: string;

  constructor(taskDataJSON: string) {
    super();
    let taskData: SelfLearningTaskData = JSON.parse(taskDataJSON);
    this.title = taskData.title;
    this.description = taskData.description;
    this.id = taskData.id;
    this.searchIndex = `${taskData.title.toLowerCase()} ${taskData.description.toLowerCase()}`;
    this.topic = taskData.topic;
    this.linkURL = taskData.linkURL;
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

  public toJSON(): string {
    let taskData: SelfLearningTaskData = {
      title: this.title,
      category: this.category,
      description: this.description,
      id: this.id,
      topic: this.topic,
      linkURL: this.linkURL,
    }
    return JSON.stringify(taskData);
  }
}
