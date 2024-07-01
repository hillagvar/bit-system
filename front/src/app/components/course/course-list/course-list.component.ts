import { Component } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorService } from '../../../services/error.service';
import { DeleteService } from '../../../services/delete.service';
import { DeleteCourseComponent } from '../delete-course/delete-course.component';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DeleteCourseComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {

  public courses: Course[] = [];
  public isError = false;

  private loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
      this.courses = data;
    },
    error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
        this.isError = true;
      }
    })  
  }

  constructor(private courseService: CourseService, private errorService: ErrorService, private deleteService: DeleteService) {
    this.loadCourses();
    this.deleteService.onCourseDeleteConfirm.subscribe((id)=> {
      this.deleteCourse(id);
    })
  }

 private deleteCourse(courseId: number) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: (data)=> {
      this.loadCourses();
    },
    error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
  }

  public openDeletePopup(id: number) {
    this.deleteService.onDeleteButtonClick.emit(id);
  }
}
