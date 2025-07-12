import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { InPlayComponent } from './in-play/in-play.component';
import { AllMarketBookComponent } from './all-market-book/all-market-book.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { MyCommissionComponent } from './my-commission/my-commission.component';
import { EditStakeComponent } from './edit-stake/edit-stake.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { TotalLedgerComponent } from './total-ledger/total-ledger.component';
import { ProfitLossComponent } from './profit-loss/profit-loss.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { LiveBetHistoryComponent } from './live-bet-history/live-bet-history.component';
import { InplayLiveComponent } from './inplay-live/inplay-live.component';


const routes: Routes = [
  {path: '', component: ClientComponent,
   children:[
    {path: '', component: InPlayComponent},
    {path: 'inplay', component: InPlayComponent},
    {path: 'all-market-book', component: AllMarketBookComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'password', component: PasswordComponent},
    {path: 'my-commission', component: MyCommissionComponent},
    {path: 'edit-stake', component: EditStakeComponent},
    {path: 'account-statement', component: AccountStatementComponent},
    {path: 'total-ledger', component: TotalLedgerComponent},
    {path: 'profit-loss', component: ProfitLossComponent},
    {path: 'bet-history', component: BetHistoryComponent},
    {path: 'live-bet-history', component: LiveBetHistoryComponent},
    {path: 'inplay-live/:id', component: InplayLiveComponent},

  ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
