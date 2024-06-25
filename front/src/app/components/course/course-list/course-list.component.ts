import { Component } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {

  public courses: Course[] = [];

  private loadCourses() {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    })
  }

  constructor(private courseService: CourseService) {
    this.loadCourses();
  }

  public deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe(()=> {
      this.loadCourses();
    });

  }

  

}
