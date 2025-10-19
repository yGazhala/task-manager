export type TaskCategory = 'learningTask' | 'workingTask';

export type TaskData = {
  category: TaskCategory;
  id: string;
  title: string;
};

export type WorkingTaskData = TaskData & {
  description: string;
  projectName: string;
  projectContactFullName: string;
  dateToComplete?: string;
}

export type LearningTaskData = TaskData & {
  topic: string;
  description?: string;
  linkURL?: string;
}
