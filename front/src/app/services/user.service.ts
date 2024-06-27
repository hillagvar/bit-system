import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

   public getUser(id: number) {
    return this.http.get<User>("http://localhost:2999/student/profile/"+id);
   }

   public updateUser(user : User){
    return this.http.put("http://localhost:2999/student/profile/"+user.id, user);
  }
}
