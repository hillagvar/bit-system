import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User | null = null;

  public onLogin = new EventEmitter<boolean>();

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
        this.onLogin.emit(true);
       })

      );
  }

  public logOut() {
    this.user = null;
    localStorage.removeItem("user");
    this.onLogin.emit(false);

  }


  public isLoggedIn() {
    return (this.user != null && this.user.token != null);
  }

  public isStudent() {
    return (this.user != null && (this.user.type == 2));
  }

  public isLecturer() {
    return (this.user != null && (this.user.type == 1));
  }

  public canViewData() {
    return this.isLoggedIn();
  }
}
