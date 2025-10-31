import {Component, DestroyRef, inject, signal, WritableSignal} from '@angular/core';
import {WsService} from '../../Services/ws.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChatMessageResponse} from '../../Models/message.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-message',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-message.html',
  styleUrl: './admin-message.css'
})
export class AdminMessage {
  private ws: WsService = inject(WsService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private fb: FormBuilder = inject(FormBuilder);

  // En signal som innehåller en lista av chat-meddelanden
  messages: WritableSignal<ChatMessageResponse[]> = signal<ChatMessageResponse[]>([])

  // Formulär för att skicka meddelanden. Innehåller fälten email och text med validering.
  // nonNullable säkerhetställer att kontrollerna aldrig innehåller null-värden.
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    text: ['', [Validators.required, Validators.maxLength(500)]]
  })

  // Getter för att enkelt komma åt email-kontrollen i formuläret
  get email() {
    return this.form.controls.email;
  }

  // Getter för att enkelt komma åt text-kontrollen i formuläret
  get text() {
    return this.form.controls.text;
  }

  // Konstruktor som prenumererar på inkommande meddelanden från WebSocket-tjänsten
  constructor() {
    // Starta en prenumeration på admin-supportkanalen
    // TakeuntilDestroyed säkerställer att prenumerationen avslutas när komponenten förstörs
    this.ws.subscribeAdminSupport()
      .pipe(takeUntilDestroyed(this.destroyRef))
      // När ett meddelande tas emot, uppdatera messages-signalen med det nya meddelandet
      .subscribe(m => this.messages.update(list => [...list, m]));
  }

  //Skickar ett svar till användaren
  send() {
    //Avbryt om formuläret är ogiltigt enligt valideringsreglerna
    if(!this.form.valid) return;

    // Hämta och trimma värdena från formulärkontrollerna för att undvika tomma mellanslag. Detta är bra för atttt säkerställa att vi inte skickar tomma meddelanden eller e-postadresser.
    const email: string = this.email.value.trim();
    const text: string = this.text.value.trim();

    // Om antingen e-post eller text är tomma efter trimning, markera kontrollerna som "touched" för att visa valideringsfel och avbryt funktionen.
    if(!email || !text) {
      this.email.markAsTouched()
      this.text.markAsTouched();
      return;
    }
    // Anropa WebSocket-tjänstens metod för att skicka meddelandet till användaren
    this.ws.sendToUser(email, text);

    // Lägger till admins eget meddelande i historiken så att det syns direkt i UI
    this.messages.update(list => [
      ...list, {from: 'Jag', text} as unknown as ChatMessageResponse
    ]);

    // Återställ formuläret efter att meddelandet har skickats, behåll e-postadressen så att man kan fortsättta diskussionen med samma användare
    this.form.reset({email, text: ''})
  }


}
