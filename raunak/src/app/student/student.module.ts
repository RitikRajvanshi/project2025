import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentRoutingModule } from './student-routing.module';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { StudentComponent } from '../student/student.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';




@NgModule({
  declarations: [
    StudentComponent,
    StudentDashboardComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,AngularMaterialModule
  ]
})
export class StudentModule { }
