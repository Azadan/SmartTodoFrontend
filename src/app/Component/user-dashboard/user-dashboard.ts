import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CreateTodo} from '../Todo/create-todo/create-todo';
import {ShowAllTodo} from '../Todo/show-all-todo/show-all-todo';

@Component({
  selector: 'app-user-dashboard',
  imports: [CreateTodo, ShowAllTodo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',

})
export class UserDashboard {

}
