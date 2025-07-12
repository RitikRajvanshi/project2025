  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { LoginComponent } from './login/login.component';
  import { AuthGuard } from './guards/auth.guard';

  const routes: Routes = [
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path:'login', component:LoginComponent},
    { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule), canActivate:[AuthGuard]} ];

  @NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
