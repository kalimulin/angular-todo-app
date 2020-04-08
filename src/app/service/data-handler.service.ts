import { Injectable } from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/TestData";
import {Task} from "../model/Task";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  constructor() { }

  fillCategories() {
    this.categoriesSubject.next(TestData.categories);
  }

  fillTasks(category?:Category) {
    const tasks = category ? TestData.tasks.filter(i => i.category === category) : TestData.tasks;
    this.tasksSubject.next(tasks);
  }
}
