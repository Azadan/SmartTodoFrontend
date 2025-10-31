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

  // Skickar ett meddelande till Ai-tjänsten och hanterar svaret
  sendMessage(): void {
    // Om formuläret inte är giltigt: markera alla fält som "touched" för att visa valideringsfel och avbryt funktionen
    if(!this.chatForm.valid) {
      this.chatForm.markAllAsTouched();
      return;
    }

    // Hämta vanan från formuläret
    const habit = this.chatForm.value.habit!;

    // Skapa en prompt för AI-tjänsten
    const prompt = `Skapa en motiverande och tydlig beskrivning av följande vana: ${habit}.`;

    // Lägg till användarens meddelande i chatloggen
    this.appendMessage({ role: 'user', content: prompt});

    // Anropa AI-tjänsten för att få en beskrivning och hantera svaret
    this.aiService
      .suggestDescription(prompt)
      // Ta endast det första svaret och avsluta prenumerationen
      .pipe(take(1))
      .subscribe({
        // Vid framgång, lägg till AI:s svar i chatloggen
        next: response => this.appendMessage({ role: 'assistant', content: response.content }),
        error: err => {
          // Vid fel, lägg till ett felmeddelande i chatloggen
          this.appendMessage({ role: 'assistant', content: 'Kunde inte hämta svar just nu.' });
        },
      });

  }

  // Lägger till ett meddelande i chatloggen
  private appendMessage(message: AiChatMessage) : void {
    this.chatLog.update(log => [...log, message]);
  }
}
