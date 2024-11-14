import { SelfLearningTaskData, TaskCategory, WorkingTaskData } from './task';

export abstract class AddTaskForm {
  public abstract category: TaskCategory;
  public abstract title: string;

  public abstract getTaskDataJSON(): string;

  protected generateItemId(): string {
    // Генерує випадковий ідентифікатор, наприклад: '875329650230'
    return Math.floor(Math.random() * Date.now()).toString();
  }
}

export class AddWorkingTaskForm extends AddTaskForm {
    public category: TaskCategory = 'workingTask'
    public title = '';
    public description = '';
    public projectName = '';
    public projectContactFullName = '';
    public dateToComplete?: string; // YYYY-MM-DD
  
    constructor() {
      super();
    }
  
    public getTaskDataJSON(): string {
      let taskData: WorkingTaskData = {
        id: this.generateItemId(),
        category: this.category,
        title: this.title,
        description: this.description,
        projectName: this.projectName,
        projectContactFullName: this.projectContactFullName,
        dateToComplete: this.dateToComplete,
      };
      return JSON.stringify(taskData);
    }
  }
  
export class AddSelfLearningTaskForm extends AddTaskForm {
  public category: TaskCategory = 'selfLearningTask';
  public title = '';
  public description = '';
  public topic = '';
  public linkURL = '';

  constructor() {
    super();
  }

  public getTaskDataJSON(): string {
    let taskData: SelfLearningTaskData = {
      id: this.generateItemId(),
      category: this.category,
      title: this.title,
      description: this.description,
      topic: this.topic,
      linkURL: this.linkURL,
    };
    return JSON.stringify(taskData);
  }
}