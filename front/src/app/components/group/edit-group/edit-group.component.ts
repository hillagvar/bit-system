import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from '../../helper/success/success.component';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports: [FormsModule, CommonModule, SuccessComponent],
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.css'
})

export class EditGroupComponent {

  public name: string = "";
  public start: Date | null = null; 
  public end: Date | null = null; 
  public id?: number = 0;
  public course?: number = 0;
  
  public courses : Course[] = [];

  public onSuccess = false;
  public successText = "";

  public isError = false;

   private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService, private courseService: CourseService, private errorService: ErrorService) {
    this.loadCourses();

    this.groupService.getGroup(this.route.snapshot.params["id"]).subscribe({
      next: (group) => {
        this.name = group.name;
        this.id = group.id;
        this.start = group.start;
        this.end = group.end;
        this.course = group.courseId;
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
        this.isError = true;
      }
    });

  }

  public updateGroup(form: NgForm) {
    
    this.groupService.updateGroup({id:this.id, ...form.form.value}, this.id!).subscribe({
      next: (data)=> {
        this.onSuccess = true;
        this.successText = "Grupė atnaujinta sėkmingai!"
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

