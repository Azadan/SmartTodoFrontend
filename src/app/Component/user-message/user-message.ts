import {Component, DestroyRef, inject, signal, WritableSignal} from '@angular/core';
import {WsService} from '../../Services/ws.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChatMessageResponse} from '../../Models/message.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-message',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-message.html',
  styleUrl: './user-message.css'
})
export class UserMessage {

  private ws: WsService = inject(WsService);
  private destroyRef: DestroyRef = inject(DestroyRef)
  private fb: FormBuilder = inject(FormBuilder)

  messages: WritableSignal<ChatMessageResponse[]> = signal<ChatMessageResponse[]>([])

  form = this.fb.nonNullable.group({
    text: ['', [Validators.required, Validators.maxLength(500)]],
  });

  // Vi skapar en getter här för att det blir lättare att få tillgång till textfältet
  get text() {
    return this.form.controls.text;
  }

  // Våran konstruktor lyssnar på ink meddelanden via ws
  constructor() {
    this.ws.subscribeUserSupport()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(m => this.messages.update(list => [...list, m]));
  }

  send() {
    if(!this.form.valid) return;

    const text = this.text.value.trim();

    if(!text) {
      this.text.markAsTouched();
      return;
    }

    this.messages.update(list => [
      { from: 'Jag' as unknown as String, text: text as unknown as String }
    ])
    this.ws.sendUserMessage({text})
    this.form.reset({text: ''})
  }

}
