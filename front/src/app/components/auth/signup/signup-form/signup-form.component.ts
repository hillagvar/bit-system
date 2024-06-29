import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SignupSuccessComponent } from '../signup-success/signup-success.component';
import { ErrorService } from '../../../../services/error.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, SignupSuccessComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

  public onSignUpSuccess = false;
  public typeSelected = false;
  public passwordsMatch = false;

  constructor(private authService: AuthService, private router: Router, private errorService: ErrorService) {}

  public selectType() {
    this.typeSelected = true;
  }

  public matchPasswords(password: string, repeatPassword: string) {
    if (password === repeatPassword) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

  public onSignUp (f: NgForm) {
    
    this.authService.registerUser(f.form.value).subscribe({
      next:  (data) => {
      f.reset();
      this.onSignUpSuccess = true;
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 5000)
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
  }


}
