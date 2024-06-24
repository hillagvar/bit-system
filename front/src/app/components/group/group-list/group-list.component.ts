import { Component } from '@angular/core';
import { Group } from '../../../models/group';
import { GroupService } from '../../../services/group.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.css'
})
export class GroupListComponent {

  public groups: Group[] = [];
  public courseId: number | null = null;
  
  public isError = false;
  public user : User | null = null;

  private loadGroups() {
    if (this.courseId != null) {
      this.groupService.getGroupsByCourse(this.courseId).subscribe({
      next: (groupData)=> {
      this.groups = groupData;
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
        this.isError = true;
      }
    });  
    }  
  }

  private loadStudentGroups() {
     
      this.groupService.getGroupsByStudent().subscribe({
      next: (groupData)=> {
      this.groups = groupData;
      },
      error: (error) => {
        this.errorService.errorEmitter.emit(error.error.text);
        this.isError = true;
      }
    });  
    
  }

  constructor(private groupService: GroupService, private route: ActivatedRoute, private errorService: ErrorService, public authService: AuthService) {
    this.user = this.authService.user;

    if (this.user != null && this.user.type == 1) {
    this.courseId = this.route.snapshot.params['id'];
    this.loadGroups();
    }
    
     if (this.user != null && this.user.type == 2) {
    
    this.loadStudentGroups();
    }

  }

  public deleteGroup(groupId: number) {
    this.groupService.deleteGroup(groupId).subscribe(()=> {
      
    })

  }

}
