import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse, CreateUserRequest, UserModel} from '../Models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'https://orca-app-htew6.ondigitalocean.app/api/v1/users';
  private http: HttpClient = inject(HttpClient);

  /*
  * register() tar emot ett objekt av typen CreateUserRequest som innehåller allt backend behöver för
  * skapa en användare.
  * Den returnerar en Observable av typen ApiResponse<UserModel>.
  * Detta innebär att när anropet är klart kommer det att returnera ett svar som innehåller information om den skapade användaren.
  * Metoden använder HttpClient för att skicka en POST-förfrågan till API:et med användardata.
 */

  register(userData: CreateUserRequest) : Observable<ApiResponse<UserModel>> {
    return this.http.post<ApiResponse<UserModel>>(`${this.apiUrl}/register`, userData);
  }

  getMe(): Observable<ApiResponse<UserModel>> {
    return this.http.get<ApiResponse<UserModel>>(`${this.apiUrl}/getLoggedInUser`);
  }
}
