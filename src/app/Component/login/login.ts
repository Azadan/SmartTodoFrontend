import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder)
  private readonly authService: AuthService = inject(AuthService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  loginForm!: FormGroup;


  // Livscykelmetod som körs när komponenten initieras
  ngOnInit() {
    // Skapar ett reaktivt formulär med fälten userName och password
    this.loginForm = this.fb.group({
      email: ['',],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]]
    });
  }

  // Metod som körs när användaren skickar in inloggningsformuläret.
  onLoginSubmit() {
    // Kontrollera om formuläret är giltigt
    if(!this.loginForm.valid){
      return;
    }

  /*
     * Anropar AuthService's login-metod med formulärets värden
     * .pipe(takeUntilDestroyed(this.destoryRef)) säkerställer att prenumerationen avslutas när komponenten förstörs
     * vilket förhindrar minnesläckor.
     * .pipe() används för att kedja ihop flera operatörer
 */
    this.authService.login(this.loginForm.value).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }

  // Metod som navigerar användaren till registreringssidan
  onRegisterClick() {
    this.authService.router.navigate(['/register']);
  }
}
