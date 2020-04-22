import { Component } from '@angular/core';
import { Task } from './model/Task';
import {DataHandlerService} from "./service/data-handler.service";
import {Category} from "./model/Category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo-app';
  tasks: Task[];
  categories: Category[];
  selectedCategory: Category;

  constructor(private dataHandler:DataHandlerService) {
  }

  ngOnInit():void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category;

    this.dataHandler.searchTasks(this.selectedCategory, null, null, null).subscribe(tasks => {
      this.tasks = tasks;
    })
  }

  onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
        .subscribe(tasks => {
          this.tasks = tasks;
        })
    })
  }

  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task).subscribe(() => {
      this.dataHandler.searchTasks(this.selectedCategory, null, null, null)
        .subscribe(tasks => {
          console.log(tasks);
          this.tasks = tasks;
        })
    })
  }

}
