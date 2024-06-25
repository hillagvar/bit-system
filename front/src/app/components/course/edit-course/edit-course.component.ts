import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { SuccessComponent } from '../../helper/success/success.component';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessComponent],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {

  public name: string = "";
  public id?: number = 0;

  public onSuccess = false;
  public successText = "";

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService) {

    this.courseService.getCourse(this.route.snapshot.params["id"]).subscribe({
      next: (course) => {
        this.name = course.name;
        this.id = course.id;
       
      },
      error: (error) => {
        console.log('error');
      }
    });

  }

  public updateCourse(form: NgForm) {
    
    this.courseService.updateCourse({id:this.id, ...form.form.value}).subscribe({
      next: (data)=> {
        
        this.onSuccess = true;
        this.successText = "Kursas atnaujintas sėkmingai!"
        setTimeout(() => {
        this.router.navigate(["/courses"]);
        }, 2000)
      },
      error: (error) => {
        console.log('error');
      }
    });

  }

}
