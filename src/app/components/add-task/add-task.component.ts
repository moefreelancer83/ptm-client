import { TaskActions } from '@_store/tasks/task.actions';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Task } from '@_/models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  addTaskForm: FormGroup;

  constructor(private store: Store, private forBuilder: FormBuilder) {
    this.addTaskForm = this.forBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.addTaskForm.valid) {
      const task: Omit<Task, 'id' | 'completed'> = this.addTaskForm.value;
      console.log('Dispatching addTask action:', task);
      this.store.dispatch(TaskActions.addTask({ task }));
    }
  }
}
