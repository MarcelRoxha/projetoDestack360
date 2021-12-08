import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { FormularioCadastroClienteComponent } from './formularios/formulario-cadastro-cliente/formulario-cadastro-cliente.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ListaContasEntradaComponent } from './lista-contas-entrada/lista-contas-entrada.component';
import { CadastrarContaEntradaComponent } from './cadastrar-conta-entrada/cadastrar-conta-entrada.component';
import { CadastrarContaSaidaComponent } from './cadastrar-conta-saida/cadastrar-conta-saida.component';
import { CadastrarClienteComponent } from './cadastrar-cliente/cadastrar-cliente.component';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';
import { LancarSaidaComponent } from './lancar-saida/lancar-saida.component';
import { LancarEntradaComponent } from './lancar-entrada/lancar-entrada.component';

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

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent,canActivate: [AuthGuard]  },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  },
    { path: 'signup', component: SignupComponent, },
    { path: 'verify-email', component: VerifyEmailComponent, },  
    { path: 'lancarEntrada', component: LancarEntradaComponent, canActivate: [AuthGuard] },  
    { path: 'lancarSaida', component: LancarSaidaComponent, canActivate: [AuthGuard]},
    { path: 'consultarClientes', component: ConsultaClienteComponent, canActivate: [AuthGuard]},
    { path: 'cadastrarCliente', component: CadastrarClienteComponent, canActivate: [AuthGuard]},  
    { path: 'cadastrarContaSaida', component: CadastrarContaSaidaComponent, canActivate: [AuthGuard]},  
    { path: 'cadastrarContaEntrada', component: CadastrarContaEntradaComponent, canActivate: [AuthGuard]},
    { path: 'listarContasEntrada', component: ListaContasEntradaComponent, canActivate: [AuthGuard]},
    { path: 'fornecedor', component: FornecedorComponent, canActivate: [AuthGuard]},
    { path: 'fornecedorlista', component: FornecedorListaComponent},
    { path: 'formulario', component: FormularioCadastroClienteComponent},
    { path: 'movimentacao', component: MovimentacaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
