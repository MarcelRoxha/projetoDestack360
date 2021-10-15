import { LancarSaidaComponent } from './lancar-saida/lancar-saida.component';
import { LancarEntradaComponent } from './lancar-entrada/lancar-entrada.component';
import { EftLanceComponent } from './eft-lance/eft-lance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

import { AuthGuard } from './services/auth.guard';


const routes: Routes = [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verify-email', component: VerifyEmailComponent },  
    { path: 'lancarEntrada', component: LancarEntradaComponent },  
    { path: 'lancarSaida', component: LancarSaidaComponent },   


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
