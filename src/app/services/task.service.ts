import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, TaskDTO } from '@_/models/task.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private apiUrl = 'http://localhost:8000/tasks';
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
      .post<TaskDTO>(this.apiUrl, this.toDTO(task), httpOptions)
      .pipe(map(this.fromDTO));
  }

  getTasks(): Observable<Task[]> {
    return this.httpClient
      .get<TaskDTO[]>(this.apiUrl, httpOptions)
      .pipe(map((tasks) => tasks.map(this.fromDTO)));
  }

  getTask(id: string): Observable<Task> {
    return this.httpClient
      .get<TaskDTO>(`${this.apiUrl}/${id}`, httpOptions)
      .pipe(map(this.fromDTO));
  }

  updateTask(id: string, taskData: Partial<Task>): Observable<Task> {
    const taskDataDTO = taskData.deadline
      ? { ...taskData, deadline: this.date_to_dateStr(taskData.deadline) }
      : taskData;
    return this.httpClient
      .put<TaskDTO>(`${this.httpClient}/${id}`, taskDataDTO, httpOptions)
      .pipe(map(this.fromDTO));
  }
  deleteTask(id: string): Observable<Task> {
    return this.httpClient
      .delete<TaskDTO>(`${this.httpClient}/${id}`)
      .pipe(map(this.fromDTO));
  }
}
