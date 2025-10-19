import { TaskData } from './task-data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskListStorageService {
  private localStorageKey = 'taskList';

  public setListData(listData: TaskData[]): void {
    const listDataJSON: string = JSON.stringify(listData);
    localStorage.setItem(this.localStorageKey, listDataJSON);
  }

  public getListData(): TaskData[] {
    const listDataInStorageJSON: string | null = localStorage.getItem(this.localStorageKey);
    if (listDataInStorageJSON) {
      return JSON.parse(listDataInStorageJSON) as TaskData[];
    }
    return [];
  }
}
