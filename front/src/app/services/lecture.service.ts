import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Lecture } from '../models/lecture';

@Injectable({
  providedIn: 'root'
})
export class LectureService {

  public openListEmitter = new EventEmitter<number>();

  constructor(private http: HttpClient) {}

  public getLecturesByGroup(groupId: number) {
    return this.http.get<Lecture[]>("http://localhost:2999/groups/"+groupId+"/lectures");
  }

  public addLecture(lecture: Lecture, fileArray: any) {
    const postLecture = new FormData();
    postLecture.append("courseId", (lecture.courseId)!.toString());
    postLecture.append("groupId", (lecture.groupId!)!.toString());
    postLecture.append("name", lecture.name);
    postLecture.append("date", (lecture.date!).toString());
    postLecture.append("description", (lecture.description == null)? "" : lecture.description);
    for (const file of fileArray)
    postLecture.append("files", file);
    return this.http.post("http://localhost:2999/lectures", postLecture);
  }

  public getLecture(lectureId: number) {
    return this.http.get<Lecture>("http://localhost:2999/lectures/"+lectureId);
   }

  public updateLecture(lecture: Lecture, lectureId: number) {
    return this.http.put("http://localhost:2999/lectures/"+lectureId, lecture);
  }

  public deleteLecture(lectureId: number) {
    const deleteDate = new Date().toJSON();
    return this.http.patch("http://localhost:2999/lectures/"+lectureId, {"deleted": deleteDate} );
   }
}
