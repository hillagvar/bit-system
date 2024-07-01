import { Component, EventEmitter } from '@angular/core';
import { Lecture } from '../../../models/lecture';
import { LectureService } from '../../../services/lecture.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';
import { lectureFile } from '../../../models/lectureFile';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-lecture-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lecture-list.component.html',
  styleUrl: './lecture-list.component.css'
})
export class LectureListComponent {

  public lectures: Lecture[] = [];
  public openedlectureId = 0;
  public groupId: number;
  public isError = false;
  public fileList : lectureFile[] = [];

  private loadLectures() {
    this.lectureService.getLecturesByGroup(this.groupId).subscribe({
      next: (lectureData)=> {
      this.lectures = lectureData;
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
        this.isError = true;
      }
    });   
  }

  private loadFiles(lectureId: number) {
    this.fileService.getFileList(lectureId).subscribe({
      next: (data)=> {
        this.fileList = data;
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
   
}

  constructor(private lectureService: LectureService, private route: ActivatedRoute, private errorService: ErrorService, public authService: AuthService, private fileService: FileService) {
    this.groupId = this.route.snapshot.params['id'];
    this.loadLectures();
    this.lectureService.openListEmitter.subscribe((id)=> {
      this.openedlectureId = id;
      this.loadFiles(id)
    });
  }

  public deleteLecture(lectureId: number) {
    this.lectureService.deleteLecture(lectureId).subscribe({
      next: (data)=> {
      this.loadLectures();
    },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
      }
    });
  }

  public openFileList(id: number) {

   if (this.openedlectureId == id) {
      this.openedlectureId = 0;
    } else {
      this.lectureService.openListEmitter.emit(id);
    }
  }

  public deleteFile(id: number) {
    this.fileService.deleteFile(id).subscribe(()=> {
      this.loadFiles(this.openedlectureId);
  })
}

  public hideFile(id: number) {
    this.fileService.hideFile(id).subscribe(()=> {
      this.loadFiles(this.openedlectureId);
    })
  }

  public unhideFile(id: number) {
    this.fileService.unhideFile(id).subscribe(()=> {
      this.fileService.getFileList(this.openedlectureId).subscribe((data)=> {
        this.fileList = data;
    })
    })
  }


 }




