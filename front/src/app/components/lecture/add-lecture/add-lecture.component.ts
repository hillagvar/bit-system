import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SuccessComponent } from '../../helper/success/success.component';
import { Course } from '../../../models/course';
import { Group } from '../../../models/group';
import { GroupService } from '../../../services/group.service';
import { CourseService } from '../../../services/course.service';
import { LectureService } from '../../../services/lecture.service';

@Component({
  selector: 'app-add-lecture',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SuccessComponent],
  templateUrl: './add-lecture.component.html',
  styleUrl: './add-lecture.component.css'
})
export class AddLectureComponent {

  public onSuccess = false;
  public successText = "";

  public courses : Course[] = [];
  public groups: Group[] = [];

  constructor (private groupService: GroupService, private courseService: CourseService, private router: Router, private lectureService: LectureService) {
    this.loadCourses();
  }

  private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

  public selectCourse(inputCourse : number) {
    this.groupService.getGroupsByCourse(inputCourse).subscribe((data)=> {
      this.groups = data;
    })
  }
 

  public submitLecture(form: NgForm) {
    this.lectureService.addLecture(form.form.value).subscribe({
      next:  (data) => {
      form.reset();
      this.onSuccess = true;
      this.successText = "Paskaita pridėta sėkmingai!"
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
