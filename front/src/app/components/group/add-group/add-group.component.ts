import { Component } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-add-group',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-group.component.html',
  styleUrl: './add-group.component.css'
})
export class AddGroupComponent {

  public courses : Course[] = [];
  public lecturers : User[] = [];

  constructor (private groupService: GroupService, private courseService: CourseService, private router: Router, private userService: UserService) {
    this.loadCourses();
    this.loadLecturers();
  }

  private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

  private loadLecturers() {
    this.userService.getLecturers().subscribe((data) => {
      this.lecturers = data;
    });
  }

  public submitGroup(form: NgForm) {
    this.groupService.addGroup(form.form.value).subscribe({
      next:  (data) => {
      this.router.navigate(["/courses"]);
      },
      error: (error) => {
        console.log('error');
      }
    })

  }

}
