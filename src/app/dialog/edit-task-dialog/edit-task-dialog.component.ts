import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работать с текущим диалоговым окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], //данные, которые передали в диалоговое окно
    private dataHandler: DataHandlerService, // ссылка на сервис работы с данными
    private dialog: MatDialog //для открытия нового диалогового окна (из текущего)
  ) { }

  categories: Category[];
  tmpCategory: Category;
  priorities: Priority[];
  tmpPriority: Priority;
  dialogTitle: string;
  tmpTitle: string;
  private task: Task;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;

    this.dataHandler.getAllCategories().subscribe(items => {
      this.categories = items;
    })

    this.tmpPriority = this.task.priority;

    this.dataHandler.getAllPriorities().subscribe(items => {
      this.priorities = items;
    })
  }

  onConfirm():void {
    this.dialogRef.close(this.task);
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
  }

  onCancel():void {
    this.dialogRef.close(null);
  }

}
