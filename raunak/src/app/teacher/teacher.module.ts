import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TeacherRoutingModule } from './teacher-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


import { TeacherComponent } from '../teacher/teacher.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';



@NgModule({
  declarations: [
    TeacherComponent,
    TeacherDashboardComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,AngularMaterialModule
  ]
})
export class TeacherModule { }
