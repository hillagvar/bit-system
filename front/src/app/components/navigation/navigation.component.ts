import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  public isLoggedIn = false;

  public logo = "http://localhost:2999/files/bit-logo-black.svg";

  constructor (public authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    
    this.authService.onLogin.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  public logOut() {
    this.authService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(["/"]);
  }


}
