import { Component } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SuccessComponent } from '../../helper/success/success.component';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessComponent],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  public onSuccess = false;
  public successText = "";

  constructor (private courseService: CourseService, private router: Router) {
    
  }

  public submitCourse(form: NgForm) {
    this.courseService.addCourse(form.form.value).subscribe({
      next:  (data) => {
      form.reset();
      this.onSuccess = true;
      this.successText = "Kursas pridėtas sėkmingai!"
      setTimeout(() => {
        this.router.navigate(["/courses"]);
      }, 5000)
      },
      error: (error) => {
        console.log('error');
      }
    })

  }

}
