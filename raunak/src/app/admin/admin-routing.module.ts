import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { DebitcreditSaComponent } from './debitcredit-sa/debitcredit-sa.component';
import { DebitcreditMComponent } from './debitcredit-m/debitcredit-m.component';
import { DebitcreditMaComponent } from './debitcredit-ma/debitcredit-ma.component';
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


export const routes: Routes = [

{
  path:'' , component:AdminComponent,

  children:[
    {path:'' , component:AdminDashboardComponent},
    {path:'dashboard' , component:AdminDashboardComponent},
    {path:'teachers' , component:TeachersComponent},
    {path:'subjects' , component:SubjectsComponent},
    {path:'classes' , component:ClassesComponent},
    {path:'complexity' , component:ComplexityComponent},
    {path:'marks' , component:MarksComponent},
    {path:'sections' , component:SectionsComponent},
    {path:'admin-details' , component:AdminDetailsComponent},
    {path:'subadmin-details' , component:SubAdminDetailsComponent},
    {path:'minadmin-details' , component:MinAdminDetailsComponent},
    {path:'supmaster-details' , component:SupmasterDetailsComponent},
    {path:'master-details' , component:MasterDetailsComponent},
    {path:'agent-details' , component:AgentDetailsComponent},
    {path:'client-details' , component:ClientDetailsComponent},
    {path:'allmatches-postion' , component:AllMatchesPositionComponent},
    {path:'inplay-games' , component:InplayGamesComponent},
    {path:'completed-games' , component:CompletedGamesComponent},
    {path:'my-ledger' , component:MyLedgerComponent},
    {path:'lena-dena' , component:LenaDenaComponent},
    {path:'debit-credit-a' , component:DebitcreditAComponent},
    {path:'debit-credit-suba' , component:DebitcreditSubAComponent},
    {path:'debit-credit-mina' , component:DebitcreditMComponent},
    {path:'debit-credit-supa' , component:DebitcreditSaComponent},
    {path:'debit-credit-ma' , component:DebitcreditMaComponent},
    {path:'debit-credit-ag' , component:DebitcreditAgComponent},
    {path:'debit-credit-cl' , component:DebitcreditClComponent},
    {path:'report-statement' , component:ReportStatementComponent},
    {path:'report-details' , component:ReportDetailsComponent},
    {path:'report-match' , component:ReportMatchComponent},
    {path:'report-login' , component:ReportLoginComponent},
    {path:'report-deadmaster' , component:ReportDeadmasterComponent},
    {path:'block-market' , component:BlockMarketComponent},
    {path:'create-user/:Id' , component:CreateUserComponent},
    {path:'select-upline/:id/:plevel' , component:SelectuplineComponent},
    {path:'edit-user/:id' , component:EditUserComponent},
   
  ]
  
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
