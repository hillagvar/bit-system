import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DeleteService } from '../../../services/delete.service';

@Component({
  selector: 'app-delete-file',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-file.component.html',
  styleUrl: './delete-file.component.css'
})
export class DeleteFileComponent {

  public deleteButtonClicked = false;
  public id = 0;

  constructor(private deleteService: DeleteService) {
    this.deleteService.onDeleteFileButtonClick.subscribe((id: number)=> {
      this.deleteButtonClicked = true;
      this.id = id;
    })
  }

  public confirmDelete() {
    this.deleteService.onFileDeleteConfirm.emit(this.id);
    this.deleteButtonClicked = false;
    this.id = 0;
  }

  public closeDeletePopup() {
    this.deleteButtonClicked = false;
  }

}
