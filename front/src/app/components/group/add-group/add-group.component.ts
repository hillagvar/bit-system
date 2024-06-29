import { Component } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SuccessComponent } from '../../helper/success/success.component';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SuccessComponent],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {

  public onSuccess = false;
  public successText = "";

  public courses : Course[] = [];

  constructor (private groupService: GroupService, private courseService: CourseService, private router: Router, private errorService: ErrorService) {
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

  public submitGroup(form: NgForm) {
    this.groupService.addGroup(form.form.value).subscribe({
      next:  (data) => {
      form.reset();
      this.onSuccess = true;
      this.successText = "Grupė pridėta sėkmingai!"
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
