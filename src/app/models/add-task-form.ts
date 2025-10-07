import { TaskCategory, TaskData, LearningTaskData, WorkingTaskData } from './task-data';

export abstract class AddTaskForm {
  public abstract category: TaskCategory;
  public abstract title: string;

  public abstract isValid(): boolean;
  public abstract getData(): TaskData;

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

  public isValid(): boolean {
    return this.title.trim().length > 0 &&
      this.description.trim().length > 0 &&
      this.projectName.trim().length > 0 &&
      this.projectContactFullName.trim().length > 0;
  }

  public getData(): WorkingTaskData {
    return {
      id: this.generateItemId(),
      category: this.category,
      title: this.title.trim(),
      description: this.description.trim(),
      projectName: this.projectName.trim(),
      projectContactFullName: this.projectContactFullName.trim(),
      dateToComplete: this.dateToComplete,
    };
  }
}

export class AddLearningTaskForm extends AddTaskForm {
  public category: TaskCategory = 'learningTask';
  public title = '';
  public description = '';
  public topic = '';
  public linkURL = '';

  constructor() {
    super();
  }

  public isValid(): boolean {
    return this.title.trim().length > 0 &&
      this.topic.trim().length > 0;
  }

  public getData(): LearningTaskData {
    return {
      id: this.generateItemId(),
      category: this.category,
      title: this.title.trim(),
      description: this.description.trim(),
      topic: this.topic.trim(),
      linkURL: this.linkURL.trim(),
    };
  }
}
