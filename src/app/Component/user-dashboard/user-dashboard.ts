import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CreateTodo} from '../Todo/create-todo/create-todo';
import {ShowAllTodo} from '../Todo/show-all-todo/show-all-todo';
import {UserMessage} from '../user-message/user-message';
import {RouterLink} from '@angular/router';
import {Upgrade} from '../Billing/upgrade/upgrade';
import {AiChat} from '../ai-chat/ai-chat';

@Component({
  selector: 'app-user-dashboard',
  imports: [CreateTodo, ShowAllTodo, UserMessage, Upgrade, AiChat],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',

})
export class UserDashboard {

}
