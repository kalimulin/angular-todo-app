import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  // поля для таблицы должны совпадать с названиями переменных класса
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;

  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  tasks: Task[];

  @Input('tasks') set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit() {
    // dataSource обязательно должен создаваться для таблицы
    this.dataSource = new MatTableDataSource();

    this.fillTable(); // заполнение таблицы данными и метаданными
  }

  ngAfterViewInit() {
    this.addTableObjects();
  }

  toggleTaskCompleted (task: Task) {
    task.completed = !task.completed;
  }

  // цвет статуса задачи
  getPriorityColor(task: Task) {
    if (task.completed) {
      return '#f8f9fa';
    }
    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return '#ffffff';
  }

  // показ задач по всем текущим условиям
  private fillTable() {
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

  private addTableObjects() {
    this.dataSource.sort = this.sort; // компонент для сортировки данных
    this.dataSource.paginator = this.paginator; // обновление компонента постраничности
  }
}
