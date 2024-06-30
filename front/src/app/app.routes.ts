import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { SignupFormComponent } from './components/auth/signup/signup-form/signup-form.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { GroupListComponent } from './components/group/group-list/group-list.component';
import { LectureListComponent } from './components/lecture/lecture-list/lecture-list.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { AddGroupComponent } from './components/group/add-group/add-group.component';
import { EditCourseComponent } from './components/course/edit-course/edit-course.component';
import { EditGroupComponent } from './components/group/edit-group/edit-group.component';
import { AddLectureComponent } from './components/lecture/add-lecture/add-lecture.component';
import { EditLectureComponent } from './components/lecture/edit-lecture/edit-lecture.component';
import { AddStudentComponent } from './components/student/add-student/add-student.component';
import { EditProfileComponent } from './components/auth/edit-profile/edit-profile.component';
import { AddFileComponent } from './components/file/add-file/add-file.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { studentGuard } from './guards/student.guard';
import { lecturerGuard } from './guards/lecturer.guard';
import { viewGuard } from './guards/view.guard';
import { StudentListComponent } from './components/student/student-list/student-list.component';


export const routes: Routes = [
    {path: "", component: LoginFormComponent},
    {path: "signup", component: SignupFormComponent},

    {
        path: "student/groups", component: GroupListComponent,
        canActivate: [studentGuard]
    },
    {
        path: "courses", component: CourseListComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "courses/add", component: AddCourseComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "courses/:id", component: EditCourseComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "courses/:id/groups", component: GroupListComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "groups/:id/lectures", component: LectureListComponent,
        canActivate: [viewGuard]
    }, 
    {
        path: "groups/add", component: AddGroupComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "groups/:id", component: EditGroupComponent,
        canActivate: [lecturerGuard]
    }, 
     {
        path: "groups/:id/students", component: StudentListComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "lectures/add", component: AddLectureComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "lectures/:id", component: EditLectureComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "students/add", component: AddStudentComponent,
        canActivate: [lecturerGuard]
    }, 
    {
        path: "student/profile", component: EditProfileComponent,
        canActivate: [studentGuard]
    }, 
    {
        path: "file/add", component: AddFileComponent,
        canActivate: [lecturerGuard]
    }, 

    {path: "**", component: PageNotFoundComponent}, 


];
