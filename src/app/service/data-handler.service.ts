import { Injectable } from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject, Observable} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/TaskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../data/dao/impl/PriorityDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private taskDAOArray = new TaskDAOArray();
  private categoryDAOArray = new CategoryDAOArray();
  private priorityDAOArray = new PriorityDAOArray();

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDAOArray.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDAOArray.search(category, searchText, status, priority);
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAOArray.getAll();
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDAOArray.update(task)
  }

  deleteTask(task: Task): Observable<Task> {
    return this.taskDAOArray.delete(task.id)
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAOArray.getAll();
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDAOArray.delete(id);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.update(category);
  }

}
