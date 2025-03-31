import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TeachersComponent } from './teachers/teachers.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ClassesComponent } from './classes/classes.component';
import { ComplexityComponent } from './complexity/complexity.component';
import { MarksComponent } from './marks/marks.component';
import { SectionsComponent } from './sections/sections.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { SubAdminDetailsComponent } from './sub-admin-details/sub-admin-details.component';
import { MinAdminDetailsComponent } from './min-admin-details/min-admin-details.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { AllMatchesPositionComponent } from './all-matches-position/all-matches-position.component';
import { InplayGamesComponent } from './inplay-games/inplay-games.component';
import { CompletedGamesComponent } from './completed-games/completed-games.component';
import { MyLedgerComponent } from './my-ledger/my-ledger.component';
import { LenaDenaComponent } from './lena-dena/lena-dena.component';
import { DebitcreditAComponent } from './debitcredit-a/debitcredit-a.component';
import { DebitcreditSubAComponent } from './debitcredit-sub-a/debitcredit-sub-a.component';
import { DebitcreditMaComponent } from './debitcredit-ma/debitcredit-ma.component';
import { DebitcreditSaComponent } from './debitcredit-sa/debitcredit-sa.component';
import { DebitcreditMComponent } from './debitcredit-m/debitcredit-m.component';
import { DebitcreditAgComponent } from './debitcredit-ag/debitcredit-ag.component';
import { DebitcreditClComponent } from './debitcredit-cl/debitcredit-cl.component';
import { ReportStatementComponent } from './report-statement/report-statement.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { ReportMatchComponent } from './report-match/report-match.component';
import { ReportLoginComponent } from './report-login/report-login.component';
import { ReportDeadmasterComponent } from './report-deadmaster/report-deadmaster.component';
import { BlockMarketComponent } from './block-market/block-market.component';
import { SupmasterDetailsComponent } from './supmaster-details/supmaster-details.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { SelectuplineComponent } from './selectupline/selectupline.component';
import { EditUserComponent } from './edit-user/edit-user.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    TeachersComponent,
    SubjectsComponent,
    ClassesComponent,
    ComplexityComponent,
    MarksComponent,
    SectionsComponent,
    AdminDetailsComponent,
    SubAdminDetailsComponent,
    MinAdminDetailsComponent,
    MasterDetailsComponent,
    AgentDetailsComponent,
    ClientDetailsComponent,
    AllMatchesPositionComponent,
    InplayGamesComponent,
    CompletedGamesComponent,
    MyLedgerComponent,
    LenaDenaComponent,
    DebitcreditAComponent,
    DebitcreditSubAComponent,
    DebitcreditMaComponent,
    DebitcreditSaComponent,
    DebitcreditMComponent,
    DebitcreditAgComponent,
    DebitcreditClComponent,
    ReportStatementComponent,
    ReportDetailsComponent,
    ReportMatchComponent,
    ReportLoginComponent,
    ReportDeadmasterComponent,
    BlockMarketComponent,
    SupmasterDetailsComponent,
    CreateUserComponent,
    SelectuplineComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AdminModule { }
