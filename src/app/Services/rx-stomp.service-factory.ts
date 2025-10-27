import {WsService} from './ws.service';
import {StompConfig} from '../stomp.config';
import {RxStomp} from '@stomp/rx-stomp';

export function RxStompServiceFactory(): RxStomp {
  const rxStomp = new RxStomp()
  rxStomp.configure(StompConfig);
  rxStomp.activate();
  return rxStomp;

}
