import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SuccessComponent } from '../../helper/success/success.component';
import { Course } from '../../../models/course';
import { Group } from '../../../models/group';
import { GroupService } from '../../../services/group.service';
import { CourseService } from '../../../services/course.service';
import { LectureService } from '../../../services/lecture.service';
import { Lecture } from '../../../models/lecture'
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-add-lecture',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SuccessComponent],
  templateUrl: './add-lecture.component.html',
  styleUrl: './add-lecture.component.css'
})
export class AddLectureComponent {

  public onSuccess = false;
  public successText = "";

  public lectureForm: FormGroup;

  public courses : Course[] = [];
  public groups: Group[] = [];
  public fileArray: File[] = [];

  constructor (private groupService: GroupService, private courseService: CourseService, private router: Router, private lectureService: LectureService, private errorService: ErrorService) {
    this.lectureForm = new FormGroup({
      "course": new FormControl(null),
      "group": new FormControl(null),
      "name": new FormControl(null),
      "date": new FormControl(null),
      "description": new FormControl(null),
    
    })
    this.courseService.getCourses().subscribe((courses)=> {
      this.courses = courses;
    });
  }

  public selectCourse(inputCourse : number) {
    this.groupService.getGroupsByCourse(inputCourse).subscribe((groups)=> {
      this.groups = groups;
    })
  }

  public onFileSelected(event:Event) {
    const file = (event.target as HTMLInputElement).files![0];

    this.fileArray.push(file);

  }

  public dropFile(i: number) {
    this.fileArray.splice(i,1);
  }
 
  public submitLecture() {
    const values = this.lectureForm.value;
    const lecture = new Lecture (values.group, values.name, values.date, 0, values.description, values.course);
    
    this.lectureService.addLecture(lecture, this.fileArray).subscribe({
      next:  (data) => {
      this.lectureForm.reset();
      this.fileArray = [];
      this.onSuccess = true;
      this.successText = "Paskaita pridėta sėkmingai!"
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
