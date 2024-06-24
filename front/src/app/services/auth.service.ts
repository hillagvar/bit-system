import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User | null = null;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem("user");

    if (user != null) {
      this.user = JSON.parse(user);
    }
  }

  public registerUser(user: User) {
    return this.http.post("http://localhost:2999/auth/signup", user);
  }

   public loginUser(user: User) {
    return this.http.post<User>("http://localhost:2999/auth/login", user).pipe(
      tap( (response)=> {
        this.user = response;
        localStorage.setItem("user", JSON.stringify(this.user));
        
       })

      );
  }

  public logOut() {
    this.user = null;
    localStorage.removeItem("user");

  }


  public isLoggedIn() {
    return (this.user != null && this.user.token != null);
  }

  public canEdit() {
    return (this.user != null && (this.user.type == 1));
  }

  public canViewData() {
    return this.isLoggedIn();
  }
}
