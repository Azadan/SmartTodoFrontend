import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../Services/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-billing.success',
  imports: [
    RouterLink
  ],
  templateUrl: './billing.success.html',
  styleUrl: './billing.success.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingSuccess implements OnInit {
  private readonly userService: UserService = inject(UserService);
  message = ''

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (res: { data: any; }) => {
        if (res?.data) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.message = 'Du är en premium användare! Tack för ditt köp.';
        } else {
          this.message = 'Betalning pågår. Ditt konto uppdateras inom kort.';
        }
      },
      error: () => {
        this.message = 'Ett fel uppstod vid hämtning av användardata.';
      }
    });
  }
}
