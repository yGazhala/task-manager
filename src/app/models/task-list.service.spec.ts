import { TaskListService } from './task-list.service';
import { TaskListStorageService } from './task-list-storage.service';
import { TaskData, LearningTaskData, WorkingTaskData } from './task-data';

class TaskListStorageMockService extends TaskListStorageService {
  private listData: TaskData[] = [];

  public override setListData(listData: TaskData[]): void {
    this.listData = listData;
  }

  public override getListData(): TaskData[] {
    return this.listData;
  }
}

describe('TaskListService', () => {
  let firstElementData: WorkingTaskData;
  let secondElementData: LearningTaskData;
  let listService: TaskListService;

  beforeEach(() => {
    firstElementData = {
      id: 'task_1',
      category: 'workingTask',
      title: 'Develop a website',
      description: 'Website description text',
      projectName: 'Website name',
      projectContactFullName: 'John Smith',
      dateToComplete: '2025-12-24',
    };

    secondElementData = {
      id: 'task_2',
      category: 'learningTask',
      title: 'Study OOP principles',
      topic: 'OOP',
      description: 'This is the most popular programming paradigm',
      linkURL: 'https://en.wikipedia.org/wiki/Object-oriented_programming',
    };

    const storageMockService = new TaskListStorageMockService();
    const listData: TaskData[] = [firstElementData, secondElementData];
    storageMockService.setListData(listData);
    listService = new TaskListService(storageMockService);
  });

  it('Should display data stored in storage', () => {
    const firstElementId = listService.searchedItems[0].id;
    expect(firstElementId).toEqual(firstElementData.id);

    const secondElementId = listService.searchedItems[1].id;
    expect(secondElementId).toEqual(secondElementData.id);
  });

  it('Should search elements by title', () => {
    listService.search('oop');
    expect(listService.searchedItems.length).toEqual(1);

    const element = listService.searchedItems[0];
    expect(element.title).toEqual('Study OOP principles');
  });

  it('Should add element to the list', () => {
    const newElementData: LearningTaskData = {
      id: 'task_3',
      category: 'learningTask',
      title: 'Read Clean Code book by R. Martin',
      topic: 'OOP',
      description: 'Book description',
    };
    listService.addItem(newElementData);

    const newElementInList = listService.searchedItems.find((item) => {
      return item.id == newElementData.id
    });

    expect(newElementInList?.id).toEqual(newElementData.id);
  });

  it('Should remove element from the list by id', () => {
    listService.removeItem(firstElementData.id);
    expect(listService.searchedItems.length).toEqual(1);
    const firstElementInList = listService.searchedItems[0];
    expect(firstElementInList.id).toEqual(secondElementData.id);
  });
});

