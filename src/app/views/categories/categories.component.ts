import { Component, OnInit } from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  currentCategory: Category;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  showTasksByCategory(category?: Category) {
    this.currentCategory = category;
    this.dataHandler.getTasksByCategory(category);
  }

}
