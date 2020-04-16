// Стандартные методы CRUD

import {Observable} from "rxjs";

// Все методы возвращают Observable  - для асинхронной работы в реактивном стиле

export interface CommonDAO<T> {
  // CRUD

  add(T): Observable<T>;

  get(id:number): Observable<T>;

  delete(id:number): Observable<T>;

  update(T): Observable<T>;

  getAll(): Observable<T[]>;
}
