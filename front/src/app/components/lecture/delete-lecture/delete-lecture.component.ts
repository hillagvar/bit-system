import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DeleteService } from '../../../services/delete.service';

@Component({
  selector: 'app-delete-lecture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-lecture.component.html',
  styleUrl: './delete-lecture.component.css'
})
export class DeleteLectureComponent {

  public deleteButtonClicked = false;
  public id = 0;

  constructor(private deleteService: DeleteService) {
    this.deleteService.onDeleteButtonClick.subscribe((id: number)=> {
      this.deleteButtonClicked = true;
      this.id = id;
    })
  }

  public confirmDelete() {
    this.deleteService.onLectureDeleteConfirm.emit(this.id);
    this.deleteButtonClicked = false;
    this.id = 0;
  }

  public closeDeletePopup() {
    this.deleteButtonClicked = false;
  }

}
