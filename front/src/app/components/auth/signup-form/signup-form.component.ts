import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { SignupSuccessComponent } from '../signup-success/signup-success.component';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, SignupSuccessComponent],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

  public onSignUpSuccess = false;

  constructor(private authService: AuthService, private router: Router) {}

  public onSignUp (f: NgForm) {
    
    this.authService.registerUser(f.form.value).subscribe((data)=> {
      
      f.reset();
      this.onSignUpSuccess = true;
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 6000)

    })

  }

}
