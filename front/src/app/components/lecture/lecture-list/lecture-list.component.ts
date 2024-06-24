import { Component } from '@angular/core';
import { Lecture } from '../../../models/lecture';
import { LectureService } from '../../../services/lecture.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-lecture-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lecture-list.component.html',
  styleUrl: './lecture-list.component.css'
})
export class LectureListComponent {

  public lectures: Lecture[] = [];
  public groupId: number;
  public isError = false;

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

  constructor(private lectureService: LectureService, private route: ActivatedRoute, private errorService: ErrorService, public authService: AuthService) {
    this.groupId = this.route.snapshot.params['id'];
    this.loadLectures();
  }

}


