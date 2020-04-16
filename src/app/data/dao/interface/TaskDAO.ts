// специфичные методы для задач

import {CommonDAO} from "./CommonDAO";
import {Task} from 'src/app/model/Task';
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {Observable} from "rxjs";

export interface TaskDAO extends CommonDAO<Task> {
  // поиск задач по всем параметрам
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task>;

  //количество завершенных задач в категории или во всех категориях
  getCompletedTasksCount(category: Category): Observable<number>;

  //количество незавершенных задач в категории или во всех категориях
  getUncompletedTasksCount(category: Category): Observable<number>;

  //общее количество задач в категории или во всех категориях
  getTasksCount(category: Category): Observable<number>;

  // количество всех задач
  getTotalCount(): Observable<number>

  getTasksByCategory(category: Category): Observable<Task[]>
}
