import { RxStomp, RxStompConfig } from '@stomp/rx-stomp';
import SockJS from 'sockjs-client';

export const StompConfig: RxStompConfig = {
  webSocketFactory: () => new SockJS('https://orca-app-htew6.ondigitalocean.app/ws'),
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200000,
  debug: (msg: string) => console.debug('[STOMP]', msg),
  beforeConnect: (client: RxStomp) => {
    const jwt: string | null = localStorage.getItem('token');
    client.configure({
      connectHeaders: jwt ? { Authorization: `Bearer ${jwt}` } : {}
    });
  }
};
