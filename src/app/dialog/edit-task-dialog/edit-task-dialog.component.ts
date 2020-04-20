import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работать с текущим диалоговым окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], //данные, которые передали в диалоговое окно
    private dataHanddler: DataHandlerService, // ссылка на сервис работы с данными
    private dialog: MatDialog //для открытия нового диалогового окна (из текущего)
  ) { }

  dialogTitle: string;
  tmpTitle: string;
  private task: Task;

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.title;
  }

  onConfirm():void {
    this.dialogRef.close(this.task);
    this.task.title = this.tmpTitle;
  }

  onCancel():void {
    this.dialogRef.close(null);
  }

}
