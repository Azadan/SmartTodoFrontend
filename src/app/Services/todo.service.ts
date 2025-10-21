import { inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse, CreateTodoRequest, Todo} from '../Models/todo.model';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //ÄNDRA VID PROD
  private apiUrl: string = 'http://localhost:8080/api/v1/todos';
  private http: HttpClient = inject(HttpClient);

  readonly todos: WritableSignal<Todo[]> = signal<Todo[]>([]);

  load(userId: number) {
    return this.http
      // Vi gör ett  GET - anrop och föväntar oss en repons av typen ApiResponse med en array av Todo objekt
      .get<ApiResponse<Todo[]>>(`${this.apiUrl}/getTodos`, {params: {userId}})
      //.pipe använder vi för att kedja RsJS-operationer
      //Vi tar responsen, r, och mappar den till r.datasom är själva listan av Todo objekt
      .pipe(map(r => r.data))
      //.subsribe aktiverar HTTP anropet.
      // När svaret kommer tstodo listan, så sätter vi in den i våran todostate
      .subscribe(ts => this.todos.set(ts));
  }

  create(req: CreateTodoRequest) {
    return this.http
      // Vi gör ett  Post - anrop och föväntar oss en repons av typen ApiResponse med en array av Todo objekt
      .post<ApiResponse<Todo>>(`${this.apiUrl}/createTodo`, req)
      //.pipe använder vi för att kedja RsJS-operationer
      //Vi tar responsen, r, och mappar den till r.datasom är själva listan av Todo objekt
      .pipe(
        map(r => r.data),
        // När svaret kommer in, lägger vi till den nya todo i våran todostate
        tap(t => this.todos.update(list => [t, ...list]))
      );
  }

  toggle(todoId: number) {
    console.log('toggle() kallad med todoId:', todoId);
    return this.http
      // Vi gör ett POST-anrop och förväntar oss en respons av typen ApiResponse med ett Todo-objekt
      .post<ApiResponse<Todo>>(`${this.apiUrl}/toggleTodo`, null, {params: {todoId}})
      // Vi tar responsen, r, och mappar den till r.data som är själva Todo-objektet
      .pipe(
        tap(response => console.log('Rå API-respons:', response)),
        map(r => r.data),
        // När svaret kommer in, uppdaterar vi todo-listan:
        // Vi byter ut det gamla todo-objektet med det uppdaterade

        tap(todo => console.log(' Transformerad Todo från r.data:', todo)),


        tap(updated =>
          this.todos.update(list =>
            list.map(t => (t.todoId === updated.todoId ? updated : t))
          )
        )
      );
  }
}
