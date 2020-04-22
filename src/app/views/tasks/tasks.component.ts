import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  // поля для таблицы должны совпадать с названиями переменных класса
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  dataSource: MatTableDataSource<Task>;

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  tasks: Task[];

  @Input('tasks') set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() selectCategory = new EventEmitter<Category>();

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // dataSource обязательно должен создаваться для таблицы
    this.dataSource = new MatTableDataSource();
    this.fillTable(); // заполнение таблицы данными и метаданными
  }

  ngAfterViewInit() {
    this.addTableObjects();
  }

  // цвет статуса задачи
  getPriorityColor(task: Task):string {
    if (task.completed) {
      return '#f8f9fa';
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#ffffff';
  }

  // показ задач по всем текущим условиям
  private fillTable(): void {
    if (this.dataSource) {
      this.dataSource.data = this.tasks;
      this.addTableObjects();

      this.dataSource.sortingDataAccessor = (task, colName) => {
        switch (colName) {
          case 'priority': {
            return task.priority ? task.priority.id : null;
          }
          case 'category': {
            return task.category ? task.category.title : null;
          }
          case 'date': {
            return task.date ? task.date.getTime() : null;
          }
          case 'title': {
            return task.title;
          }
        }
      }
    }
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort; // компонент для сортировки данных
    this.dataSource.paginator = this.paginator; // обновление компонента постраничности
  }

  onClickTask(task: Task): void {
    this.openEditTaskDialog(task);
  }

  openDeteleTaskDialog(task: Task):void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтверждение',
        message: 'Вы действительно хотите удалить задачу?'
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task);
      }
    })
  }

  onToggleStatus(task: Task):void {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  private openEditTaskDialog(task: Task): void {
    const dialogRef = this.dialog.open(
      EditTaskDialogComponent,
      {data: [task, 'Редактирование задачи'], autoFocus: false, minWidth: '500px'}
      );
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }
      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }
    })
  }

  onSelectCategory(category: Category) {
    this.selectCategory.emit(category)
  }
}
