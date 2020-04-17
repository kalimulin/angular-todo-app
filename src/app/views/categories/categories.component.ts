import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: Category[];

  @Output() selectCategory = new EventEmitter<Category>();
  currentCategory: Category;

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit() {
    // this.dataHandler.getAllCategories().subscribe(categories => {
    //   this.categories = categories;
    // });
  }

  showTasksByCategory(category?: Category) {
    if (this.currentCategory === category) {
      return;
    }
    this.currentCategory = category;

    this.selectCategory.emit(this.currentCategory);
  }

}
