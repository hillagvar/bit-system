import { Component } from '@angular/core';
import { DeleteService } from '../../../services/delete.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css'
})
export class DeleteCourseComponent {

  public deleteButtonClicked = false;
  public id = 0;

  constructor(private deleteService: DeleteService) {
    this.deleteService.onDeleteButtonClick.subscribe((id: number)=> {
      this.deleteButtonClicked = true;
      this.id = id;
    })
  }

  public confirmDelete() {
    this.deleteService.onCourseDeleteConfirm.emit(this.id);
    this.deleteButtonClicked = false;
    this.id = 0;
  }

  public closeDeletePopup() {
    this.deleteButtonClicked = false;
  }

}
