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

  // ngOnInit kör direkt när komponenten initieras
  ngOnInit(): void {
    // Begär den inloggade användaren från min backend. Får vi tillbaka en premium användare så uppdaterar vi localStorage och visar ett tack meddelande.
    this.userService.getMe().subscribe({
      // next triggas när vi får ett svar från servern
      next: (res: { data: any; }) => {
        if (res?.data) {
          // Uppdatera localStorage med den nya användardatan
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
