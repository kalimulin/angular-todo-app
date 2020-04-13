import { Component, OnInit } from '@angular/core';
import {Task} from "../../model/Task";
import {DataHandlerService} from "../../service/data-handler.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  // поля для таблицы должны совпадать с названиями переменных класса
  displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  dataSource: MatTableDataSource<Task>;

  tasks: Task[];

  constructor(private dataHandler: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandler.tasksSubject.subscribe(tasks => {
      this.tasks = tasks;
    });

    // dataSource обязательно должен создаваться для таблицы
    this.dataSource = new MatTableDataSource();

    this.refreshTable();
  }

  toggleTaskCompleted(task: Task) {
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
  private refreshTable() {
    this.dataSource.data = this.tasks;
  }
}
