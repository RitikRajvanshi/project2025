import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherComponent } from './teacher.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

export const routes: Routes = [

{
  path:'' , component:TeacherComponent,

  children:[
    {path:'' , component:TeacherDashboardComponent},
    {path:'dashboard' , component:TeacherDashboardComponent},
   


  ]
  
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
