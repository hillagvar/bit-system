import { Component } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { User } from '../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DeleteStudentComponent } from '../delete-student/delete-student.component';
import { DeleteService } from '../../../services/delete.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DeleteStudentComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {

  public students : User[] = [];
  public groupId: number;
  public isError = false;
  public errorText = "";
  public allStudents: User[] = [];

  constructor(private studentService: StudentService, private route: ActivatedRoute, private errorService: ErrorService, public authService: AuthService, private deleteService: DeleteService) {
    this.groupId = this.route.snapshot.params['id'];
    this.loadStudents();
    this.loadAllStudents();

    this.deleteService.onStudentDeleteConfirm.subscribe((id)=> {
      this.deleteStudentFromGroup(id);
    })
  }

  private loadStudents() {
    this.studentService.getStudentsByGroup(this.groupId).subscribe({
      next: (data)=> {
      this.students = data;
    },
      error: (error) => {
         this.errorService.errorEmitter.emit(error.error.text);
      }
    })
  }
  
  private deleteStudentFromGroup(pairId: number) {
    this.studentService.deleteStudentFromGroup(pairId).subscribe({
      next:  (data) => {
      this.loadStudents();
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
  }


  private loadAllStudents() {
    this.studentService.getAllStudents().subscribe((data) => {
      this.allStudents = data;
    })
  }

  public submitStudent(f: NgForm) {
     this.studentService.addStudentToGroup(this.groupId, f.form.value).subscribe({
      next:  (data) => {
      this.loadStudents();
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
    
  }

  public openDeletePopup(id: number) {
    this.deleteService.onDeleteButtonClick.emit(id);
  }

}
