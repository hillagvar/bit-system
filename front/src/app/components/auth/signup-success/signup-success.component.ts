import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.css'
})
export class SignupSuccessComponent {

  @Input()
  public onSignUpSuccess = false;

}
