import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {TodoService} from '../../../Services/todo.service';
import {AuthService} from '../../../Services/auth.service';
import {CreateTodoRequest} from '../../../Models/todo.model';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-todo.html',
  styleUrl: './create-todo.css'
})
export class CreateTodo {

  private fb: FormBuilder = inject(FormBuilder);
  private todoService = inject(TodoService);
  private authService = inject(AuthService);

  createForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  message: string = "";

  onSubmit() {
    if(!this.createForm.valid){
      return;
    }
    const todoData: CreateTodoRequest = {
      userId: this.authService.user()?.userId,
      title: this.createForm.value.title!,
      description: this.createForm.value.description!,
    }

    this.todoService.create(todoData).subscribe({
      next: (response) => {
        this.message = "En habit är skapad skapad!";
        this.createForm.reset();
      },
      error: (error) => {
        console.error('Error creating todo:', error);
        this.message = "Ett fel inträffade vid skapande av att-göra-uppgift";
      }
    });
  }
}
