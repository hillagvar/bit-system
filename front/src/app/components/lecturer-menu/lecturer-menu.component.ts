import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lecturer-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lecturer-menu.component.html',
  styleUrl: './lecturer-menu.component.css'
})
export class LecturerMenuComponent {

  public isError : boolean = false;

  constructor (private errorService: ErrorService) {
    this.errorService.errorEmitter.subscribe((data) => {
      this.isError = true;
    });
  }


}
