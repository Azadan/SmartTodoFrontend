import {Component, inject, OnInit, WritableSignal} from '@angular/core';
import {TodoService} from '../../../Services/todo.service';
import {AuthService} from '../../../Services/auth.service';
import {Todo} from '../../../Models/todo.model';

@Component({
  selector: 'app-show-all-todo',
  standalone: true,
  imports: [],
  templateUrl: './show-all-todo.html',
  styleUrl: './show-all-todo.css'
})
export class ShowAllTodo implements OnInit {

  private todoService: TodoService = inject(TodoService);
  private authService: AuthService = inject(AuthService);

  protected todos: WritableSignal<Todo[]> = this.todoService.todos;

  message: string = '';

  ngOnInit() {
    const userId = this.authService.user()?.userId;
    if (userId != null) {
      this.todoService.load(userId);
    }else {
      this.message = 'Kunde inte ladda todo-listan: användar-ID saknas.';
    }
  }

  onToggle(t: Todo) {
    this.todoService.toggle(t.todoId).subscribe();
  }


}
