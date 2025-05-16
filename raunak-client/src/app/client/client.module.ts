import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { HeaderComponent } from './header/header.component';
import { InPlayComponent } from './in-play/in-play.component';
import { AllMarketBookComponent } from './all-market-book/all-market-book.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { MyCommissionComponent } from './my-commission/my-commission.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { TotalLedgerComponent } from './total-ledger/total-ledger.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { LiveBetHistoryComponent } from './live-bet-history/live-bet-history.component';
import { EditStakeComponent } from './edit-stake/edit-stake.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InplayLiveComponent } from './inplay-live/inplay-live.component';
import { TestComponent } from './test/test.component';
import { Test2Component } from './test2/test2.component';



@NgModule({
  declarations: [
    ClientComponent,
    HeaderComponent,
    InPlayComponent,
    AllMarketBookComponent,
    ProfileComponent,
    PasswordComponent,
    MyCommissionComponent,
    AccountStatementComponent,
    TotalLedgerComponent,
    ProfitLossComponent,
    BetHistoryComponent,
    LiveBetHistoryComponent,
    EditStakeComponent,
    InplayLiveComponent,
    TestComponent,
    Test2Component,
  ],
  exports:[HeaderComponent],

  imports: [
    CommonModule,
    ClientRoutingModule,FormsModule, ReactiveFormsModule,HttpClientModule
  ]
})
export class ClientModule { }
