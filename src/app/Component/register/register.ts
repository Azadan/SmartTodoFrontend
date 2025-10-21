import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';
import {ApiResponse, CreateUserRequest, UserModel} from '../../Models/user.model';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb : FormBuilder = inject(FormBuilder)
  private userService: UserService = inject(UserService);
  private router : Router = inject(Router);

  /*
     * Detta är ett formulär som innehåller fälten som finns CreateUserRequest.
     * Formbuilder används för att skapa formuläret.
     * Båda fälten är obligatoriska och har vissa valideringsregler.
     *
  */
  form = this.fb.group({
    email: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]]
  });

  // Meddelande som visas efter registrering. Används för att visa felmeddelanden eller lyckad registrering.
  message = '';

  onSubmit() {
    if (this.form.valid) {
      const userData: CreateUserRequest = {
        email: this.form.value.email!,
        firstName: this.form.value.firstName!,
        lastName: this.form.value.lastName!,
        password: this.form.value.password!
      };

      //TA BORT VID PROD
      console.log(userData);


      //Åkallar våran service för att registrera användaren
      this.userService.register(userData).subscribe({
        next: (response: ApiResponse<UserModel>) => {
          if (response.success) {
            this.message = 'Användare skapad!';
            //TA BORT VID PROD
            console.log(response);
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.message = 'Fel vid registrering';
          }
        },
        error: () => {
          this.message = 'Fel vid registrering';
        }
      });
    }
  }
}
