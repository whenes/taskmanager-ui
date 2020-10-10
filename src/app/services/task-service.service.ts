import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = "https://whenes-taskmanager-api.herokuapp.com/api/task";
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.URL)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.URL, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.URL, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  deleteTask(id: number) {
    return this.http.delete<number>(`${this.URL}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código de erro: ${error.status}, menssagem: ${error.message}`;
    }
    console.log(errorMessage)
    return throwError(errorMessage);
  }
}
