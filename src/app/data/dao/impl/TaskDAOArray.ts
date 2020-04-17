import {TaskDAO} from "../interface/TaskDAO";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {Observable, of} from "rxjs";
import {Task} from 'src/app/model/Task';
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {
  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(t => t.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedTasksCount(category: Category): Observable<number> {
    return undefined;
  }

  getTasksCount(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getUncompletedTasksCount(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority));
  }

  update(T): Observable<Task> {
    return undefined;
  }

  getTasksByCategory(category: Category): Observable<Task[]> {
    return of(TestData.tasks.filter(t => t.category === category));
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks;

    if (category) {
      allTasks = allTasks.filter(c => c.category === category);
    }

    return allTasks;
  }

}
