import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserModel} from '../Models/user.model';
import {authRequest, authResponse} from '../Models/auth.model';
import {catchError, Observable, of, tap} from 'rxjs';
import {RxStomp} from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // readonly innebär att värdet inte kan ändras efter initialisering
  private readonly http: HttpClient = inject(HttpClient);
  readonly router: Router = inject(Router);
  private readonly rxStomp: RxStomp = inject(RxStomp);

  /*
   *JwtHelperService används för att hantera och validera JWT-tokens.
   * Detta är en del av @auth0/angular-jwt biblioteket som erbjuder olika hjälpfunktioner för att arbeta med JWT.
   */
  private readonly jwtHelper: JwtHelperService = inject(JwtHelperService);

  private readonly apiUrl = 'https://orca-app-htew6.ondigitalocean.app/api/v1/auth';

  // En signal som håller reda på den autentiserade användaren
  get user(): WritableSignal<UserModel | null> {
    const token = localStorage.getItem('token');
    return signal(token ? this.jwtHelper.decodeToken(token) : null);
  }

  /*
   *Kollar om användaren är autentiserad genom att kontrollera om JWT-token är giltig och inte har gått ut
   * Taget från dokumentationen för @auth0/angular-jwt
   */
  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  /*
   * login() tar emot ett objekt av typen authRequest som innehåller email och lösenord.
   * Den returnerar en Observable av typen authResponse eller null vid fel.
   * När anropet är klart kommer det att returnera ett svar som innehåller en JWT-token och användarens information.
   * Metoden använder HttpClient för att skicka en POST-förfrågan till API:et med inloggningsdata.
   * Om inloggningen lyckas lagras token i localStorgare och användaren omdirigeras till dashboard.
 */

  // Hjälpmetod för att lagra token och användardata i localStorage
  storeToken(response: authResponse): void {
    localStorage.setItem('token', response.jwt);
    localStorage.setItem('user', JSON.stringify(response.userDTO));
  }

  login(body: authRequest): Observable<authResponse | null> {
    return this.http.post<authResponse>(`${this.apiUrl}/login`, body)
      // Pipe används för att kedja ihop flera operationer på Observable
      .pipe(
        // Tap innebär att vi kan utföra sid-effekter utan att ändra den emitterade värdet
        // I detta fall är sid-effekten att lagra token och navigera
        // Och det emitterade värdet är själva inloggningssvaret
        tap(response => {
          // TA BORT VID PROD
          console.log('login response', response);
          if (response) {
            this.storeToken(response);
            this.rxStomp.deactivate().then(() => this.rxStomp.activate());
            this.router.navigate(['/userDashboard']);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          if (error.status === 401) {
            console.error('Unauthorized');
          }
          return of(null);
        })
      )
  }

  // logout() tar bort token från localStorage, sätter användarsignalen till null och navigerar till inloggningssidan
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): UserModel | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) as UserModel : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return !!user?.isAdmin;
  }

  isStandardUser(): boolean {
      const user = this.getCurrentUser();
      return !!user && !user.isAdmin;
    }
}
