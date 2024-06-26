import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lecture } from '../models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  constructor(private http: HttpClient) {}

  public getLecturesByGroup(groupId: number) {
    return this.http.get<Lecture[]>("http://localhost:2999/groups/"+groupId+"/lectures");
  }

  public addLecture(lecture: Lecture) {
    return this.http.post("http://localhost:2999/lectures", lecture);
  }

  public getLecture(lectureId: number) {
    return this.http.get<Lecture>("http://localhost:2999/lectures/"+lectureId);
   }

  public updateLecture(lecture: Lecture) {
    return this.http.put("http://localhost:2999/lectures", lecture);
  }

  public deleteLecture(lectureId: number) {
    const deleteDate = new Date().toJSON();
    return this.http.patch("http://localhost:2999/lectures/"+lectureId, {"deleted": deleteDate} );
   }
}
