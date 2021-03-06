import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


import { RouterModule } from '@angular/router';
import { MyChartComponent } from './my-chart/my-chart.component';
import { EftLanceComponent } from './eft-lance/eft-lance.component';
import { CadClientComponent } from './cad-client/cad-client.component';
import { LancarEntradaComponent } from './lancar-entrada/lancar-entrada.component';
import { LancarSaidaComponent } from './lancar-saida/lancar-saida.component';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';
import { CadastrarClienteComponent } from './cadastrar-cliente/cadastrar-cliente.component';
import { CadastrarContaSaidaComponent } from './cadastrar-conta-saida/cadastrar-conta-saida.component';
import { CadastrarContaEntradaComponent } from './cadastrar-conta-entrada/cadastrar-conta-entrada.component';
import { ListaContasEntradaComponent } from './lista-contas-entrada/lista-contas-entrada.component';
import { NgxMaskModule } from 'ngx-mask';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { FornecedorListaComponent } from './fornecedor-lista/fornecedor-lista.component';
import { FormularioCadastroClienteComponent } from './formularios/formulario-cadastro-cliente/formulario-cadastro-cliente.component';
import { FormularioCadastroEmpresaComponent } from './formularios/formulario-cadastro-empresa/formulario-cadastro-empresa.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { TelaCadastroComponent } from './cadastro/tela-cadastro/tela-cadastro.component';
import { TelaAcessoComponent } from './telasprincipais/tela-acesso/tela-acesso.component';
import { TelaEmpresasComponent } from './telasprincipais/tela-empresas/tela-empresas.component';
import { TelaClientesComponent } from './telasprincipais/tela-clientes/tela-clientes.component';
import { TelaFornecedoresComponent } from './telasprincipais/tela-fornecedores/tela-fornecedores.component';
import { TelaBancosComponent } from './telasprincipais/tela-bancos/tela-bancos.component';
import { TelaEntradasComponent } from './telasprincipais/tela-entradas/tela-entradas.component';
import { TelaSaidasComponent } from './telasprincipais/tela-saidas/tela-saidas.component';
import { TelaTransferenciasComponent } from './telasprincipais/tela-transferencias/tela-transferencias.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    DashboardComponent,
    AdminDashboardComponent,
    HeaderComponent,
    SidenavComponent,
    MyChartComponent,
    EftLanceComponent,
    CadClientComponent,
    LancarEntradaComponent,
    LancarSaidaComponent,
    ConsultaClienteComponent,
    CadastrarClienteComponent,
    CadastrarContaSaidaComponent,
    CadastrarContaEntradaComponent,
    ListaContasEntradaComponent,
    FornecedorComponent,
    FornecedorListaComponent,
    FormularioCadastroClienteComponent,
    FormularioCadastroEmpresaComponent,
    CampoControlErroComponent,
    MovimentacaoComponent,
    TelaCadastroComponent,
    TelaAcessoComponent,
    TelaEmpresasComponent,
    TelaClientesComponent,
    TelaFornecedoresComponent,
    TelaBancosComponent,
    TelaEntradasComponent,
    TelaSaidasComponent,
    TelaTransferenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule, 
    RouterModule, 
    AngularFireModule.initializeApp(environment.firebase),??
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatInputModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
       }),
    NgbModule

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
