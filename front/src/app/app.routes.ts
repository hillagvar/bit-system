import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { SignupFormComponent } from './components/auth/signup-form/signup-form.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { LectureListComponent } from './components/lecture/lecture-list/lecture-list.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { AddGroupComponent } from './components/group/add-group/add-group.component';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { EditGroupComponent } from './components/group/edit-group/edit-group.component';


export const routes: Routes = [
    {path: "", component: LoginFormComponent},
    {path: "signup", component: SignupFormComponent},
    {path: "student/groups", component: GroupListComponent},
    {path: "courses", component: CourseListComponent}, //only lecturer can access
    {path: "courses/add", component: AddCourseComponent}, //only lecturer can access
    {path: "courses/:id", component: EditCourseComponent}, //only lecturer can access
    {path: "courses/:id/groups", component: GroupListComponent}, //only lecturer can access
    {path: "groups/:id/lectures", component: LectureListComponent}, 
    {path: "groups/add", component: AddGroupComponent}, 
    {path: "groups/:id", component: EditGroupComponent}, 

];
