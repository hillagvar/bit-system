import { Component } from '@angular/core';
import { ErrorComponent } from '../error/error.component';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-error-block',
  standalone: true,
  imports: [ErrorComponent],
  templateUrl: './error-block.component.html',
  styleUrl: './error-block.component.css'
})
export class ErrorBlockComponent {
  public isError : boolean = false;
  public errorText: string = "";

  constructor (private errorService: ErrorService) {
    this.errorService.errorEmitter.subscribe((text) => {
      this.isError = true;
      this.errorText = text;
      setTimeout(() => {
        this.isError = false;
      }, 6000);

    })

  }

}
