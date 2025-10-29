import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UserService} from '../../../Services/user.service';

@Component({
  selector: 'app-billing-cancel',
  imports: [],
  templateUrl: './billing-cancel.html',
  styleUrl: './billing-cancel.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BillingCancel {
}
