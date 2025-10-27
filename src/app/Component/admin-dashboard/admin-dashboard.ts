import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AdminMessage} from '../admin-message/admin-message';
import {CreateTodo} from '../Todo/create-todo/create-todo';
import {ShowAllTodo} from '../Todo/show-all-todo/show-all-todo';
import {UserMessage} from '../user-message/user-message';

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminMessage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {

}
