import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../services/group.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from '../../helper/success/success.component';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

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
  // public lecturer: User | null = null;

  public onSuccess = false;
  public successText = "";

   private loadCourses() {
    this.courseService.getCourses().subscribe((data)=> {
      this.courses = data;
    });
  }

  // private loadLecturer() {
  //   this.userService.getLecturer().subscribe((data) => {
  //     this.lecturer = data;
  //   });
  // }

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService, private courseService: CourseService, private userService: UserService) {
    this.loadCourses();
    // this.loadLecturer();

    this.groupService.getGroup(this.route.snapshot.params["id"]).subscribe({
      next: (group) => {
        this.name = group.name;
        this.id = group.id;
        this.start = group.start;
        this.end = group.end;
        this.course = group.courseId;
      },
      error: (error) => {
        console.log('error');
      }
    });

  }

  public updateGroup(form: NgForm) {
    
    this.groupService.updateGroup({id:this.id, ...form.form.value}).subscribe({
      next: (data)=> {
        this.onSuccess = true;
        this.successText = "Grupė atnaujinta sėkmingai!"
        setTimeout(() => {
        this.router.navigate(["/courses"]);
        }, 2000)
      },
      error: (error) => {
        console.log('error');
      }
    });

  }

  public selectCourse(id: number) {
    (id == this.course)? true : false;
  }
    

}

