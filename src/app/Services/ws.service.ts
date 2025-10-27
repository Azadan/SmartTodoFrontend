import {inject, Injectable} from '@angular/core';
import {IMessage, RxStomp} from '@stomp/rx-stomp';
import {ChatMessageRequest, ChatMessageResponse} from '../Models/message.model';
import {map, Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private rxStomp: RxStomp = inject(RxStomp);


  // Användare kan lyssna (watch) på sin personliga que
  subscribeUserSupport(): Observable<ChatMessageResponse> {
    return this.rxStomp.watch('/user/queue/support')
      .pipe(
        map(msg => JSON.parse(msg.body) as ChatMessageResponse)
      );
  }

  //Admin lyssnar på topic
  subscribeAdminSupport(): Observable<ChatMessageResponse> {
    return this.rxStomp.watch('/topic/support/admin')
      .pipe(map(msg => JSON.parse(msg.body) as ChatMessageResponse));
  }

  //Användare skickar (publish) meddelande till admin
  sendUserMessage(msg: ChatMessageRequest): void {
    this.rxStomp.publish({
      destination: '/app/support/message',
      body: JSON.stringify(msg)
    });
  }

  //Admin skickar ett meddelande till en användare. Identifierar användaren via användarens email
  sendToUser(email: string, text: string): void {
    this.rxStomp.publish({
      destination: `/app/support/to/${encodeURIComponent(email)}`,
      body: JSON.stringify({ text })
    });
  }
}
