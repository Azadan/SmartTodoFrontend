import {Component, inject, signal, WritableSignal} from '@angular/core';
import {AiService} from '../../Services/ai.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AiChatMessage} from '../../Models/ai-chat.model';
import {take} from 'rxjs';

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './ai-chat.html',
  styleUrl: './ai-chat.css'
})
export class AiChat {

  private readonly aiService: AiService = inject(AiService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  readonly chatLog : WritableSignal<AiChatMessage[]> = signal<AiChatMessage[]>([]);

  readonly chatForm = this.fb.nonNullable.group({
    habit: ['', [Validators.required, Validators.minLength(3)]],
  });

  sendMessage(): void {
    if(!this.chatForm.valid) {
      this.chatForm.markAllAsTouched();
      return;
    }

    const habit = this.chatForm.value.habit!;

    const prompt = `Skapa en motiverande och tydlig beskrivning av följande vana: ${habit}.`;

    this.appendMessage({ role: 'user', content: prompt});

    this.aiService
      .suggestDescription(prompt)
      .pipe(take(1))
      .subscribe({
        next: response => this.appendMessage({ role: 'assistant', content: response.content }),
        error: err => {
          this.appendMessage({ role: 'assistant', content: 'Kunde inte hämta svar just nu.' });
        },
      });

  }

  private appendMessage(message: AiChatMessage) : void {
    this.chatLog.update(log => [...log, message]);
  }
}
