import { Component } from '@angular/core';
import { DeleteService } from '../../../services/delete.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-group.component.html',
  styleUrl: './delete-group.component.css'
})
export class DeleteGroupComponent {

  public deleteButtonClicked = false;
  public id = 0;

  constructor(private deleteService: DeleteService) {
    this.deleteService.onDeleteButtonClick.subscribe((id: number)=> {
      this.deleteButtonClicked = true;
      this.id = id;
    })
  }

  public confirmDelete() {
    this.deleteService.onGroupDeleteConfirm.emit(this.id);
    this.deleteButtonClicked = false;
    this.id = 0;
  }

  public closeDeletePopup() {
    this.deleteButtonClicked = false;
  }

}
