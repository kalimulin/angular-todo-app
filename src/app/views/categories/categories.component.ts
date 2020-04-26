import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() categories: Category[];

  @Output() selectCategory = new EventEmitter<Category>();
  @Output() deleteCategory = new EventEmitter<Category>();
  @Output() updateCategory = new EventEmitter<Category>();

  @Input() currentCategory: Category;

  indexMouseMove: number;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) { }

  ngOnInit() {

  }

  showTasksByCategory(category?: Category):void {
    if (this.currentCategory === category) {
      return;
    }
    this.currentCategory = category;

    this.selectCategory.emit(this.currentCategory);
  }

  showEditIcon(index: number) {
    this.indexMouseMove = index;
  }

  openEditDialog(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории'],
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteCategory.emit(category);
        return
      }
      if (typeof (result) === 'string') {
        category.title = result as string;
        this.updateCategory.emit(category);
        return;
      }
    })
  }

}
