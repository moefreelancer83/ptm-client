import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, TaskDTO } from '@_/models/task.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //TODO: this should not be hardcoded
  private API_URL = 'http://localhost:8000/tasks';
  constructor(private httpClient: HttpClient) {}

  private date_to_dateStr = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  private toDTO(
    task: Omit<Task, 'id' | 'completed'>
  ): Omit<TaskDTO, 'id' | 'completed'> {
    return {
      ...task,
      deadline: this.date_to_dateStr(task.deadline),
    };
  }

  private fromDTO(taskDTO: TaskDTO): Task {
    return {
      ...taskDTO,
      deadline: new Date(taskDTO.deadline),
    };
  }

  addTask(task: Omit<Task, 'id' | 'completed'>): Observable<Task> {
    console.log('TaskService: Adding task:', task);

    return this.httpClient
      .post<TaskDTO>(this.API_URL, this.toDTO(task), httpOptions)
      .pipe(map(this.fromDTO));
  }

  getTasks(): Observable<Task[]> {
    console.log('[in taskService ... getTasks]');
    return this.httpClient.get<TaskDTO[]>(this.API_URL, httpOptions).pipe(
      map((tasks) => tasks.map(this.fromDTO)),
      tap((tasks) => console.log('TaskService: Retrieved tasks:', tasks)),
      catchError(this.handleError)
    );
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient
      .get<TaskDTO>(`${this.API_URL}/${id}`, httpOptions)
      .pipe(map(this.fromDTO));
  }

  updateTask(taskData: Task): Observable<Task> {
    const taskDataDTO = taskData.deadline
      ? { ...taskData, deadline: this.date_to_dateStr(taskData.deadline) }
      : taskData;
    console.log(taskDataDTO);
    return this.httpClient
      .put<TaskDTO>(`${this.API_URL}/${taskData.id}`, taskDataDTO)
      .pipe(map(this.fromDTO));
  }
  deleteTask(id: string): Observable<Task> {
    return this.httpClient
      .delete<TaskDTO>(`${this.API_URL}/${id}`)
      .pipe(map(this.fromDTO));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something is wrong?'));
  }
}
