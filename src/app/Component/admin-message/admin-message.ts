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

  messages: WritableSignal<ChatMessageResponse[]> = signal<ChatMessageResponse[]>([])

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    text: ['', [Validators.required, Validators.maxLength(500)]]
  })

  get email() {
    return this.form.controls.email;
  }

  get text() {
    return this.form.controls.text;
  }

  constructor() {
    this.ws.subscribeAdminSupport()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(m => this.messages.update(list => [...list, m]));
  }

  send() {
    if(!this.form.valid) return;

    const email: string = this.email.value.trim();
    const text: string = this.text.value.trim();

    if(!email || !text) {
      this.email.markAsTouched()
      this.text.markAsTouched();
      return;
    }
    this.ws.sendToUser(email, text);

    this.messages.update(list => [
      ...list, {from: 'Jag', text} as unknown as ChatMessageResponse
    ]);

    this.form.reset({email, text: ''})
  }


}
