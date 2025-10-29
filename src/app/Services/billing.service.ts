import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StripeService} from 'ngx-stripe';
import {ApiResponse, CheckoutData} from '../Models/checkout.model';
import {switchMap} from 'rxjs/operators';
import {catchError, map, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl: string = 'http://localhost:8080/api/v1/billing';
  private http: HttpClient = inject(HttpClient);
  private stripeService : StripeService = inject(StripeService);
  private readonly endpoint = `http://localhost:8080/api/v1/billing/create-checkout-session`;


  checkout() {
    return this.http.post<ApiResponse<CheckoutData>>(this.endpoint, {}).pipe(
      switchMap(result => {
        const data = result?.data;
        if (data?.url) {
          window.location.href = data.url;
          return of(void 0);
        }
        if (data?.id) {
          return this.stripeService.redirectToCheckout({ sessionId: data.id }).pipe(
            map(() => void 0)
          );
        }
        return throwError(() => new Error('Invalid checkout response'));
      }),
      catchError(err => {
        console.error('Error redirecting to checkout:', err?.message ?? err);
        return throwError(() => err);
      })
    );
  }
}
