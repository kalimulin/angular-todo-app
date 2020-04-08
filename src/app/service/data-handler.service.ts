import { Injectable } from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new Subject<Task[]>();

  constructor() { }

  getCategories(): Category[] {
    return TestData.categories;
  }

  fillTasks(category?:Category) {
    const tasks = category ? TestData.tasks.filter(i => i.category === category) : TestData.tasks;
    this.tasksSubject.next(tasks);
  }
}
