import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';


export const routes: Routes = [

{
  path:'' , component:StudentComponent,

  children:[
    {path:'' , component:StudentDashboardComponent},
    {path:'dashboard' , component:StudentDashboardComponent},
   


  ]
  
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
