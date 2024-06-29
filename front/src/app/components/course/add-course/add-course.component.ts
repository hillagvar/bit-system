import { Component } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SuccessComponent } from '../../helper/success/success.component';
import { ErrorService } from '../../../services/error.service';
import { ErrorBlockComponent } from '../../helper/error-block/error-block.component';
import { ErrorComponent } from '../../helper/error/error.component';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessComponent, ErrorComponent],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {

  public onSuccess = false;
  public successText = "";

  constructor (private courseService: CourseService, private router: Router, private errorService: ErrorService) {
    
  }

  public submitCourse(form: NgForm) {
    this.courseService.addCourse(form.form.value).subscribe({
      next:  (data) => {
      form.reset();
      this.onSuccess = true;
      this.successText = "Kursas pridėtas sėkmingai!"
      setTimeout(() => {
        this.router.navigate(["/courses"]);
      }, 2000)
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })

  }

}
