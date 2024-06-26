import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { CommonModule } from '@angular/common';
import { Group } from '../../../models/group';
import { AuthService } from '../../../services/auth.service';
import { SuccessComponent } from '../../helper/success/success.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SuccessComponent],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  public onSuccess = false;
  public successText = "";

  public studentForm: FormGroup;
  public groups: Group[] = [];

  constructor(private authService: AuthService, private groupService: GroupService, private router: Router) {
    this.studentForm = new FormGroup({
    "name": new FormControl(null, [Validators.required, Validators.minLength(3)]),
    "surname": new FormControl(null, [Validators.required, Validators.minLength(3)]),
    "email": new FormControl(null, [Validators.email, Validators.required]),
    "password": new FormControl(null, [Validators.required]),
    "groupFields": new FormArray([
      new FormControl(null, [Validators.required])
    ]),
    });

    this.loadGroups();
  };

  private loadGroups() {
    this.groupService.getGroupsByLecturer().subscribe((groups)=> {
      this.groups = groups;
    });
  }

  get groupFields() {
    return (this.studentForm.get("groupFields") as FormArray).controls;
  }

  public addGroupField() {
    const groupField= new FormControl(null, [Validators.required]);
    (this.studentForm.get("groupFields") as FormArray).push(groupField);
  }

  public removeGroupField() {
    (this.studentForm.get("groupFields") as FormArray).removeAt(-1)
  }

  public registerStudent() {
    this.authService.registerStudent(this.studentForm.value).subscribe({
      next:  (data) => {
      this.studentForm.reset();
      this.onSuccess = true;
      this.successText = "Studentas pridėtas sėkmingai!"
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
