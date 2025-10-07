// Оголошуємо тип для опису категорій завдань (базових обʼєктів додатку)
export type TaskCategory = 'learningTask' | 'workingTask';

// Базовий тип обʼєкта, який описує спільні властивості завдання
export type TaskData = {
  category: TaskCategory;
  id: string;
  title: string;
};

// WorkingTaskData - тип обʼєкта, який описує робоче завдання.
// Символ & означає обʼднання властивостей обʼєкта TaskData
// та властивостей визначених в {} в новий обʼєкт - WorkingTaskData.
// Тобто обʼєкт WorkingTaskData має властивості обʼєкта TaskData
// плюс власні властивості.
export type WorkingTaskData = TaskData & {
  description: string;
  projectName: string;
  projectContactFullName: string;
  dateToComplete?: string;
}

// LearningTaskData - тип обʼєкта який описує навчальне завдання.
export type LearningTaskData = TaskData & {
  topic: string;
  description?: string;
  linkURL?: string;
}
