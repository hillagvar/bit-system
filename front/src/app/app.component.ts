import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';
import { ErrorBlockComponent } from './components/helper/error-block/error-block.component';
import { LecturerMenuComponent } from './components/lecturer-menu/lecturer-menu.component';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavigationComponent, LoginFormComponent, SignupFormComponent, ErrorBlockComponent, LecturerMenuComponent, PageNotFoundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';

  public isLecturer = false;

   constructor(private authService: AuthService) {

    if (this.authService.user != null && this.authService.user.type == 1) {
      this.isLecturer = true;
    }
    

    this.authService.onLogin.subscribe((isLoggedIn) => {
      if (this.authService.user != null && this.authService.user.type == 1 && isLoggedIn) {
      this.isLecturer = true;
    } else {
      this.isLecturer = false;
    }
      
    })

   }
}
