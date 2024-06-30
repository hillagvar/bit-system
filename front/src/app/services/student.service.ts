import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getStudentsByGroup(groupId: number) {
    return this.http.get<User[]>("http://localhost:2999/groups/"+groupId+"/students");
  }


  public deleteStudentFromGroup(pairId: any) {
    return this.http.delete("http://localhost:2999/student/groups/"+pairId);
  }


  public getAllStudents() {
    return this.http.get<User[]>("http://localhost:2999/student/all");
  }

  public addStudentToGroup(groupId: number, studentId: number) {
    return this.http.post("http://localhost:2999/groups/"+groupId+"/students/add", studentId);
  }
}
