import { Component } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  constructor (private courseService: CourseService, private router: Router) {
    
  }

  public submitCourse(form: NgForm) {
    this.courseService.addCourse(form.form.value).subscribe({
      next:  (data) => {
      this.router.navigate(["courses"]);
      },
      error: (error) => {
        console.log('error');
      }
    })

  }

}
