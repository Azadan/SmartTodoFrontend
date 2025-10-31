import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {AiResponse} from '../Models/ai-chat.model';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  private apiUrl: string = 'https://orca-app-htew6.ondigitalocean.app/api/v1/ai';
  private http: HttpClient = inject(HttpClient);

  suggestDescription(message: string): Observable<AiResponse> {
    const params = new HttpParams().set('message', message);
    return this.http.get(`${this.apiUrl}/suggestDescription`, {
      params,
      responseType: 'text'
    })
    .pipe(map(content => ({content})))
  }
}
