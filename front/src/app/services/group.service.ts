import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

   constructor(private http: HttpClient) {}

   public getGroupsByStudent() {
    return this.http.get<Group[]>("http://localhost:2999/student/groups");
   }

   public getGroupsByCourse(courseId: number) {
    return this.http.get<Group[]>("http://localhost:2999/courses/"+courseId+"/groups");
   }

   public getGroup(groupId: number) {
    return this.http.get("http://localhost:2999/groups/"+groupId);
   }

   public addGroup() {

   }

   public editGroup() {

   }

   public deleteGroup() {

   }
}
