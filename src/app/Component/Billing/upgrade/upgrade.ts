import {Component, inject} from '@angular/core';
import {BillingService} from '../../../Services/billing.service';

@Component({
  selector: 'app-upgrade',
  imports: [],
  templateUrl: './upgrade.html',
  styleUrl: './upgrade.css'
})
export class Upgrade {
  private readonly billing: BillingService = inject(BillingService);
  message = '';

  // Upgrade metod som anropas när användaren klickar på "Uppgradera" knappen
  onUpgrade() {
    // Anropar checkout metoden i BillingService för att initiera betalningen
    this.billing.checkout().subscribe({
      next: () => {
        this.message = 'Omdirigerar till betalning...';
        error: () => {
          this.message='Ett fel uppstod vid initiering av betalning.';
        }
      }
    });
  }
}
