import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { SignupFormComponent } from './components/auth/signup-form/signup-form.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { LectureListComponent } from './components/lecture/lecture-list/lecture-list.component';


export const routes: Routes = [
    {path: "", component: LoginFormComponent},
    {path: "signup", component: SignupFormComponent},
    {path: "student/groups", component: GroupListComponent},
    {path: "courses", component: CourseListComponent}, //only lecturer can access
    {path: "courses/:id/groups", component: GroupListComponent}, //only lecturer can access
    {path: "groups/:id/lectures", component: LectureListComponent}, 

];
