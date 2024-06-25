import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  public getCourses() {
    return this.http.get<Course[]>("http://localhost:2999/courses");
  }

  public getCourse(courseId: number) {
    return this.http.get<Course>("http://localhost:2999/courses/"+courseId);
   }

  public addCourse(course: Course) {
    return this.http.post("http://localhost:2999/courses", course);
  }

  public updateCourse(course: Course) {
    return this.http.put("http://localhost:2999/courses", course);
  }

  public deleteCourse(courseId: number) {
    const deleteDate = new Date().toJSON();
    return this.http.patch("http://localhost:2999/courses/"+courseId, {"deleted": deleteDate} );
   }
}
