import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../models/user';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  constructor(private authService: AuthService, private router: Router, private errorService: ErrorService) {}

  public onLogin(f: NgForm) {
    this.authService.loginUser(f.form.value).subscribe({
      next : (user: User)=> {
        if (user.type == 2) {
          this.router.navigate(["student/groups"]);
        }
        if (user.type == 1) {
          this.router.navigate(["courses"]);
        }
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
  }

}
