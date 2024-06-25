import { Component } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { SuccessComponent } from '../../helper/success/success.component';

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
  // public lecturers : User[] = [];
  // public lecturer: User | null = null;

  constructor (private groupService: GroupService, private courseService: CourseService, private router: Router, private userService: UserService) {
    this.loadCourses();
    // this.loadLecturer();
  }

  private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

  // private loadLecturers() {
  //   this.userService.getLecturers().subscribe((data) => {
  //     this.lecturers = data;
  //   });
  // }

  // private loadLecturer() {
  //   this.userService.getLecturer().subscribe((data) => {
  //     this.lecturer = data;
  //   });
  // }

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
        console.log('error');
      }
    })

  }

}
