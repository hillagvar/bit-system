import { Component } from '@angular/core';
import { Course } from '../../../models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { CourseService } from '../../../services/course.service';
import { Group } from '../../../models/group';
import { LectureService } from '../../../services/lecture.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from '../../helper/success/success.component';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-edit-lecture',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessComponent],
  templateUrl: './edit-lecture.component.html',
  styleUrl: './edit-lecture.component.css'
})
export class EditLectureComponent {

  public name: string = "";
  public date: Date | null = null; 
  public description?: string = ""; 
  public id?: number = 0;
  public group?: number = 0;
  public course?: number = 0;
  
  public courses : Course[] = [];
  public groups: Group[] = [];

  public onSuccess = false;
  public successText = "";

   private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

  private loadGroups(id: number) {
    this.groupService.getGroupsByCourse(id).subscribe((data)=> {
      this.groups = data;
    });
  }

  public changeGroupList(inputCourse : number) {
    this.loadGroups(inputCourse);
  }

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService, private courseService: CourseService, private lectureService: LectureService, private errorService: ErrorService) {
    this.loadCourses();

    this.lectureService.getLecture(this.route.snapshot.params["id"]).subscribe({
      next: (lecture) => {
        this.name = lecture.name;
        this.id = lecture.id;
        this.date = lecture.date;
        this.description = lecture.description;
        this.group = lecture.groupId;
        this.course = lecture.courseId;
        this.loadGroups(this.course!);
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    });

  }

  public updateLecture(form: NgForm) {
    
    this.lectureService.updateLecture({id:this.id, ...form.form.value}, this.id!).subscribe({
      next: (data)=> {
        this.onSuccess = true;
        this.successText = "Paskaita atnaujinta sėkmingai!"
        setTimeout(() => {
        this.router.navigate(["/courses"]);
        }, 2000)
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    });

  }

}
