import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { authGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'forget-password', component:ForgetPasswordComponent},
  {path: 'teacher', loadChildren:()=> import('./teacher/teacher.module').then(m=>m.TeacherModule),canActivate: [authGuardGuard]},
  {path: 'student', loadChildren:()=> import('./student/student.module').then(m=>m.StudentModule),canActivate: [authGuardGuard]},
  {path: 'admin', loadChildren:()=> import('./admin/admin.module').then(m=>m.AdminModule), canActivate: [authGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
