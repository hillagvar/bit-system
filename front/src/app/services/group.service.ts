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

   //reik metodo gauti grupes pgl destytoja

   public getGroup(groupId: number) {
    return this.http.get("http://localhost:2999/groups/"+groupId);
   }

   public addGroup(group: Group) {
    console.log(group);
    return this.http.post("http://localhost:2999/groups", group);
  }

   public editGroup() {

   }

   public deleteGroup(groupId: number) {
    const deleteDate = new Date().toJSON();
    
    return this.http.patch("http://localhost:2999/groups/"+groupId, {"deleted": deleteDate} );

   }
}
