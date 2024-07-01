import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { Course } from '../../../models/course';
import { Group } from '../../../models/group';
import { Lecture } from '../../../models/lecture';
import { LectureService } from '../../../services/lecture.service';
import { SuccessComponent } from '../../helper/success/success.component';
import { FileService } from '../../../services/file.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-add-file',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessComponent],
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.css'
})
export class AddFileComponent {

  public courses : Course[] = [];
  public groups : Group[] = [];
  public lectures: Lecture[] = [];
  public onSuccess = false;
  public successText = "";
  public fileArray : File[] = [];


  constructor (private groupService: GroupService, private courseService: CourseService, private router: Router, private lectureService: LectureService, private fileService: FileService, private errorService: ErrorService) {
    this.loadCourses();
  }

   private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

   public selectCourse(inputCourse : number) {
    this.groupService.getGroupsByCourse(inputCourse).subscribe((groups)=> {
      this.groups = groups;
    })
  }

  public selectGroup(inputGroup : number) {
    this.lectureService.getLecturesByGroup(inputGroup).subscribe((lectures)=> {
      this.lectures = lectures;
    })
  }

   public onFileSelected(event:Event) {
    const file = (event.target as HTMLInputElement).files![0];

    this.fileArray.push(file);

  }

  public dropFile(i: number) {
    this.fileArray.splice(i,1);
  }

   public submitFile(f: NgForm) {
  
    this.fileService.addFile(f.form.value.lecture, this.fileArray).subscribe({
      next:  (data) => {
      this.onSuccess = true;
      this.successText = "Failai pridėti sėkmingai!";
      setTimeout(() => {
        this.router.navigate(["/courses"]);
      }, 4000)
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })

  }



}
