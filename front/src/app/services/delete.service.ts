import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  public onDeleteButtonClick = new EventEmitter<number>();
  public onDeleteFileButtonClick = new EventEmitter<number>();

  public onCourseDeleteConfirm = new EventEmitter<number>();
  public onGroupDeleteConfirm = new EventEmitter<number>();
  public onLectureDeleteConfirm = new EventEmitter<number>();
  public onFileDeleteConfirm = new EventEmitter<number>();

  constructor() { }
}
