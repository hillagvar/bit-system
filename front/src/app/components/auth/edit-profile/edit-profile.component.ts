import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SuccessComponent } from '../../helper/success/success.component';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, SuccessComponent],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  public name: string = "";
  public surname: string = "";
  public phone: string = "";
  public email: string = "";
  public id?: number = 0;

  public onSuccess = false;
  public notProfile = true;
  public successText = "";


  constructor(private authService: AuthService, private userService: UserService) {
    this.loadProfile();
  }

  private loadProfile() {
    if (this.authService.user != null && this.authService.user.id != null) {

      this.userService.getUser(this.authService.user.id).subscribe({
      next: (user) => {
        this.name = user.name!;
        this.surname = user.surname!;
        this.phone = user.phone!;
        this.email = user.email;
        this.id = user.id!;
      },
      error: (error) => {
        console.log('error');
      }
    });

    }

  }

  public updateUser(form: NgForm) {
    
    this.userService.updateUser({id:this.id, ...form.form.value}).subscribe({
      next: (data)=> {
        this.loadProfile();
        this.onSuccess = true;
        this.notProfile = false;
        this.successText = "Profilis atnaujintas sėkmingai!"
      },
      error: (error) => {
        console.log(error.error.text);
      }
    });

  }  

}
