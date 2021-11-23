import { ContaCaixa } from './../models/contaCaixaModel';
import { ContaSaidaSalvaFutura } from './../models/ContaSaidaSalvaFutura';
import { ContaSaidaService } from './../services/conta-saida.service';
import { UserModelService } from './../services/user-model.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { Cliente } from '../models/clienteModel';
import { ClienteService } from '../services/cliente.service';

import {HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ContaEntrada } from '../models/contaEntradaModel';
import { LancamentoEntrada } from '../models/lancamentoEntradaModel';
import { ContaEntradaSalvaFutura } from '../models/lancamentoEntradaSalvoFuturo';
import { ContaEntradaService } from '../services/conta-entrada.service';
import { LancamentoSaida } from '../models/LancamentoSaidaModel';
import Swal from 'sweetalert2';
import { ContaBancoModel } from '../models/contaBancoModel';
import { EmpresaModel } from '../models/empresaModel';
import { EmpresaService } from '../service/empresa.service';



@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css'],

  animations:[
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '1250px',
       
        padding: '33px',
        backgroundColor: 'white',
        transform: 'translateX(-190px)'
      })),
      state('closed', style({
        width: '1050px',       
        
        padding: '33px',
        backgroundColor: 'white',        
      })),
      transition('* => *', [
        animate('1s'),
       
      ]),
    ]),
  ],
})
export class ConsultaClienteComponent implements OnInit {

  clientes : Cliente[] = [];
  user: Observable<any>; 
  isOpen = false; 
  isDisabled = false;
  clickCliente = false;  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  clienteInfo: any = new Cliente();

  //variaveis para informacoes cliente recuperada

  identificador: string;
  nome: string;
  cpf: string;
  usuariocliente: string;
  email: string;
  telefone: string;
  celular: string;
  created: string;
  modified: string;
  obs: string;
  status: string;  


  data: Date = new Date();

  //

  isProgressVisible: boolean;


  //-------FORMGROUP------------//

  cadastrarFormEmpresa: FormGroup;
  lancerFormSaida: FormGroup;
  lancerFormControl: FormControl;
  lancerFormCreditoCaixa: FormGroup;



  lancerForm: FormGroup;
 
  firebaseErrorMessage: string;
  clickDashBoard = false;    
  dataRecuperada : string;
  emailUser: string;
  nomeUser: string;
  cont: number;
  cont2 : number;
  checkAnonimo: boolean = false;
  web : any;
  form: FormGroup;
  checkAnonimoEscolha: boolean = false;
  dataescolhida : string;
  valorentrada : string;
  infoentrada: string;
  checkDigitarLancamento: boolean = false;
  listaEntradasCadastradas : ContaEntrada [] = [];
  contaEntrada : ContaEntrada;
  contaEntradaInicial : ContaEntrada;
  contaEntradaCadastradaSelecionada : ContaEntrada [] = [];
  contaEntradaSelecionada : string ;
  salvarParaLancamentosFuturos: boolean = false;
  contaSalvaParaLancamentosFuturos : ContaEntradaSalvaFutura;
  LancamentoEntrada: LancamentoEntrada = new LancamentoEntrada();
  lancamentoSaidaSalvoFuturo: ContaSaidaSalvaFutura = new ContaSaidaSalvaFutura();
  lancamentoSaida: LancamentoSaida = new LancamentoSaida();

  identificadorLancamentoEntrada:string;
  dataLancamento:string;
  valorLancamento: string;
  descricaoLancamento: string
  destalhesLancamentoEntrada: string;
  contaSaidaFutura: ContaSaidaSalvaFutura;
  //lancamentoSaida: any;
  datalancamentoSaida: any;
  valorlancamentoSaida: any;
  contaSaidaLancamento: any;
  descricaolancamentoSaida: any;

  verificaClientesCadastrados: boolean = false ;

  //-------CONTA CAIXA-------//

  contaCaixa: ContaCaixa = new ContaCaixa()
  identificadorLancamentoEntradaContaCaixa:string;
  dataLancamentoContaCaixa:string;
  valorLancamentoContaCaixa: string;
  descricaoLancamentoContaCaixa: string
  destalhesLancamentoEntradaContaCaixa: string;

  //-------CONTA BANCO---------///

  contaBanco: ContaBancoModel = new ContaBancoModel()
  identificadorLancamentoEntradaContaBanco:string;
  dataLancamentoContaBanco:string;
  valorLancamentoContaBanco: string;
  descricaoLancamentoContaBanco: string
  destalhesLancamentoContaBanco: string;

  //----------CADASTRAR EMPRESA--------//

  empresaCadastrar: any ;
  identificadorCliente: String ;
	cnpj: string ;
	endereco :string ;
	emailEmpresa :string ;
	cep : string ;
	numero :string ;
	complemento :string ;
	razaoSocial :string ;
	nomeEmpresa :string ;

  //----------EMPRESAS CADASTRADAS--------//
  empresas: EmpresaModel [] = [];
  identificadorEmpresa: String ;
	cnpjEmpresa: string ;
	enderecoEmpresa :string ;
	emailEmpresaEmpresa :string ;
	cepEmpresa : string ;
	numeroEmpresa :string ;
	complementoEmpresa :string ;
	razaoSocialEmpresa :string ;
	nomeEmpresaEmpresa :string ; 

  //----------RECUPERAR INFORMAÇÕES EMPRESA CLIENTE--------//
  clienteRecuperaEmpresa : any = new Cliente();
 

  //-----------INFORMAÇÕES RECUPERADA PARA EFETUAR LANCAMENTO PARA O DEVIDO CLIENTE---------------///
  identificadorClienteLancaCredito: string;
  identificadorEmpresaLancaCredito: string;

  identificadorClienteLancaDebito: string;
  identificadorEmpresaLancaDebito: string;


// Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(private contaSaidaService: ContaSaidaService, 
    private fb: FormBuilder,
    private contaEntradaService: ContaEntradaService,
    private _httpClient: HttpClient, 
    private clienteservice: ClienteService, 
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore, 
    private router : Router,
    private serviceEmpresa: EmpresaService) {
    this.router.navigate(['/consultarClientes']);
    this.contaEntradaInicial = new ContaEntrada();

    this.lancerForm = new FormGroup({
      'dataLancamentoEntrada': new FormControl(''),
      'valorlancamentoentrada': new FormControl(''),
      'contaEntrdaSelecionada' : new FormControl(''),
      'descricaoLancamento' : new FormControl(''),
  
  });

  this.lancerFormSaida = new FormGroup({
    'datalancamentoSaida': new FormControl('', Validators.required),
    'valorlancamentoSaida': new FormControl('', [Validators.required]),
    'descricaoLancamento' : new FormControl('', Validators.required),
    'contaSaidaLancamento' : new FormControl('', Validators.required),
    'descricaoLancamentoSaida' : new FormControl('', Validators.required)
});

this.cadastrarFormEmpresa = new FormGroup({
  'nomeEmpresa': new FormControl('', Validators.required),
  'razaoSocial': new FormControl('', [Validators.required]),
  'cnpj' : new FormControl('', Validators.required),
  'endereco' : new FormControl('', Validators.required),
  'numero' : new FormControl('', Validators.required),
  'cep' : new FormControl('', Validators.required),
  'complemento' : new FormControl('', Validators.required),
  'email' : new FormControl('', Validators.required)
});

this.lancerFormCreditoCaixa = new FormGroup({
  'dataLancamentoEntrada': new FormControl(''),
  'valorlancamentoentrada': new FormControl(''),
  'contaEntrdaSelecionada' : new FormControl(''),
  'descricaoLancamento' : new FormControl(''),

});

  }

  ngOnInit(): void {

    this.empresaCadastrar = new EmpresaModel();
      this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
          if (user) {
              let emailLower = user.email.toLowerCase();
              this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
              this.emailUser = emailLower;
              this.user.subscribe(resposta=>{
                 this.nomeUser = resposta.displayName;
              })
                   // get the user's doc in Cloud Firestore
          }
      });

     

      this.clienteservice.listarClientes().subscribe(clientesCadastradosBanco =>{
        this.clientes = clientesCadastradosBanco;
        this.clienteRecuperaEmpresa = this.clientes;
      
     
       
       // console.log("Empresas Recuperadas: ",  this.clientes["cpf"])
        console.log("Clientes Recuperados: ", this.clientes)
        if(clientesCadastradosBanco === null){
         let cliente : Cliente = new Cliente();
         
         cliente.celular = "1111111"
         cliente.nome = "teste nome"
         cliente.cpf = "teste cpf"
         cliente.usuariocliente = "teste usuario"
         cliente.emailCliente = "teste email"
         cliente.telefone = "teste telefone"
         cliente.celular = "teste celular"
         cliente.created = "teste created"
         cliente.modified = "teste modified"

         this.clientes.push(cliente);

        this.verificaClientesCadastrados = true;
          return;
        }else{
          
        }
      })

     

      this.listaEntradasCadastradas.push(this.contaEntradaInicial);
this.contaEntradaService.listaContasEntradaSalvas().subscribe(constaEntradaSalva=>{
  this.listaEntradasCadastradas = constaEntradaSalva;
})
let cliente : Cliente = new Cliente();
         
         cliente.celular = "1111111"
         cliente.nome = "teste nome"
         cliente.cpf = "teste cpf"
         cliente.usuariocliente = "teste usuario"
         cliente.emailCliente = "teste email"
         cliente.telefone = "teste telefone"
         cliente.celular = "teste celular"
         cliente.created = "teste created"
         cliente.modified = "teste modified"

         this.clientes.push(cliente);

  }
  logout(): void {
    this.afAuth.signOut();
}
toggle(){
this.isOpen = !this.isOpen;
}


recuperarinformacoesEmpresa(identificadorCliente : string){

  this.clienteservice.recuperarEmpresaCadastradasCliente(identificadorCliente).subscribe(empresasRecuperadas =>{
    this.empresas = empresasRecuperadas;
  })

console.log("Identificador recuperado: ", identificadorCliente);
console.log("Empresaas recuperadas: ", this.empresas);
}

clickcliente(){
return this.clickCliente = !this.clickCliente;
}

lancarEntradaContaBanco(){
  this.contaBanco = new ContaBancoModel();
  this.contaBanco.dataLancamentoContaBanco = this.dataLancamentoContaBanco;
  this.contaBanco.valorLancamentoContaBanco = this.valorLancamentoContaBanco;
  this.contaBanco.destalhesLancamentoContaBanco = this.destalhesLancamentoContaBanco;
  this.contaBanco.descricaoLancamentoContaBanco = this.descricaoLancamentoContaBanco;
console.log("Lançar conta Banco: ", this.contaBanco);

}

lancarEntradaContaCaixa(){
  this.contaCaixa = new ContaCaixa();
  this.contaCaixa.dataLancamentoContaCaixa = this.dataLancamentoContaCaixa;
  this.contaCaixa.valorLancamentoContaCaixa = this.valorLancamentoContaCaixa;
  this.contaCaixa.descricaoLancamentoContaCaixa = this.descricaoLancamentoContaCaixa;
  this.contaCaixa.destalhesLancamentoEntradaContaCaixa = this.destalhesLancamentoEntradaContaCaixa;
console.log("Lançar conta Banco: ", this.contaCaixa);

}

preparerLancarCreditoCaixa(identificadorCliente:string, identificadorEmpresa: string){
console.log("Recuperado para caixa: ", identificadorCliente, identificadorEmpresa)

}
preparerLancarCreditoBanco(identificadorCliente:string, identificadorEmpresa: string){
  console.log("Recuperado para banco: ", identificadorCliente, identificadorEmpresa)
}

recuperarInformarcoesClientesSelecionado(idClienteSelecionado: string){

 
  this.clienteservice.recuperarInformacoesCliente(idClienteSelecionado).subscribe(resultadoInfoCliente=>{

    this.identificador = resultadoInfoCliente.identificador;
    this.cpf = resultadoInfoCliente.cpf;
    this.celular = resultadoInfoCliente.celular;
    this.created = resultadoInfoCliente.created;
    this.modified = resultadoInfoCliente.modified;
    this.email = resultadoInfoCliente.emailCliente;
    this.nome = resultadoInfoCliente.nome;
    this.telefone = resultadoInfoCliente.telefone;
    this.usuariocliente = resultadoInfoCliente.usuariocliente;
  
  })



 

}

efetuarCreditoCaixa(){

}
acessoDigitarLancamentoEntrada(){  
  this.checkDigitarLancamento = !this.checkDigitarLancamento;
 
 if(this.checkDigitarLancamento == true){
   this.descricaoLancamento = '';
 }

this.contaEntradaService.listaContasEntradaSalvas().subscribe(constaEntradaSalva=>{
  this.listaEntradasCadastradas = constaEntradaSalva;
})
 
}

contaEntradaSalvaSelecionada(descricaoContaEntrada : string){
  this.contaEntradaSelecionada = descricaoContaEntrada;

  this.lancerForm = this.fb.group({
    'nome' : this.nomeUser,
    'email' : this.emailUser,
    'data' : this.dataLancamento,
    'valor': this.valorLancamento,
    'descricao' : this.descricaoLancamento
  })

}


salvarLancaMentoEntradaDigitada(){
  this.salvarParaLancamentosFuturos = !this.salvarParaLancamentosFuturos;
  }

  salvarLancaMentoSaidaDigitada(){
    this.salvarParaLancamentosFuturos = !this.salvarParaLancamentosFuturos;
    return this.salvarParaLancamentosFuturos;
    }


declaroAnonimo(){
  this.checkAnonimo = !this.checkAnonimo;
  console.log('check Anonimo:')
  }

  salvarLancamentoEntrada(idCliente: string){

    if(this.salvarParaLancamentosFuturos == true){
      this.contaSalvaParaLancamentosFuturos = new ContaEntradaSalvaFutura();
      this.contaSalvaParaLancamentosFuturos.identificadorCliente = this.cpf;
      this.contaSalvaParaLancamentosFuturos.nomeContaEntradaLancamentoFuturos = this.descricaoLancamento;
      this.contaSalvaParaLancamentosFuturos.emailClienteQueSugeriu = this.emailUser;
        this.contaEntradaService.salvarContaParaLancamentosFuturos({...this.contaSalvaParaLancamentosFuturos}).subscribe(resultado=>{
          console.log("Salvar futura: " + resultado)
        })
        console.log("Resultado nude: " + this.contaSalvaParaLancamentosFuturos.emailClienteQueSugeriu)
  
    }
  
  
    if(this.destalhesLancamentoEntrada === "" ){
      this.destalhesLancamentoEntrada = "Sem descrição"
    }
    
    this.LancamentoEntrada.identificador = this.identificador;
    this.LancamentoEntrada.dataLancamentoEntrada = this.dataLancamento;
    this.LancamentoEntrada.emailUserLancandoEntrada = this.emailUser;
    this.LancamentoEntrada.nomeUserLancandoEntrada = this.nomeUser;
    this.LancamentoEntrada.valorLancamentoEntrada = this.valorLancamento;
    this.LancamentoEntrada.nomeLancamentoEntrada = this.descricaoLancamento;
    this.LancamentoEntrada.detalhesLancamentoEntrada = this.destalhesLancamentoEntrada;
    
    this.contaEntradaService.lancarEntrada({...this.LancamentoEntrada}).subscribe(resultado=>{
      
      console.log("Resultado API: ", resultado);
      if(resultado !== null){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Lançamento efetuado com sucesso!',
          showConfirmButton: false,
          timer: 1000
        })
        
        this.lancerForm.reset();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Favor verifique as informações e/ou a conexão e tente novamente, se o problema persistir contate o administrado',
         
        })
      }


    })
  
    console.log("Resultado ngModel", {...this.LancamentoEntrada});
    console.log("Resultado form", {...this.lancerForm.value})
  
  
    this.lancerForm = new FormGroup({
      'dataLancamentoEntrada': new FormControl(''),
      'valorlancamentoentrada': new FormControl(''),
      'contaEntrdaSelecionada' : new FormControl(''),
      'descricaoLancamento' : new FormControl(''),
  
  });
  
  //this.router.navigate(['/dashboard'])
 // window.location.reload();
  
  }

  cadastrarEmpresaCliente(identificadorCliente: string){
    this.empresaCadastrar = new EmpresaModel();
    this.data = new Date();

    this.empresaCadastrar.identificadorCliente = identificadorCliente;
    this.empresaCadastrar.cnpj = this.cnpj;
    this.empresaCadastrar.endereco = this.endereco;

    this.empresaCadastrar.email = this.email;
    this.empresaCadastrar.cep = this.cep;
    this.empresaCadastrar.numero = this.numero;
    this.empresaCadastrar.complemento = this.complemento;
    this.empresaCadastrar.razaoSocial = this.razaoSocial;
    this.empresaCadastrar.created = this.data.toTimeString();
    this.empresaCadastrar.modified = "Cliente Sem modificações"
    this.empresaCadastrar.nomeEmpresa =this.nomeEmpresa;

    if(this.empresaCadastrar){
      

      this.serviceEmpresa.cadastrarEmpresaClienteAPI(this.empresaCadastrar).subscribe(Resultado=>{
        console.log("resultado do cadastrar API: ",Resultado)
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Empresa cadastrada com sucesso!',
        showConfirmButton: false,
        timer: 1000
      })
      this.nomeEmpresa ="";
      this.email = "";
      this.cep = "";
      this.numero= "";
      this.complemento ="";
      this.razaoSocial="";
      this.cnpj ="";
      this.endereco ="";
      console.log("Sucesso ao cadastrar")
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Favor verifique as informações e/ou a conexão e tente novamente, se o problema persistir contate o administrado',
       
      })
      console.log("Erro ao cadastrar")
    }

    
  
  }

  salvarLancamentoSaida(identificador: string){



    if(this.salvarParaLancamentosFuturos == true){
      this.contaSaidaFutura = new ContaSaidaSalvaFutura();
      this.contaSaidaFutura.nomeContaEntradaLancamentoFuturos = this.descricaoLancamento;
      this.contaSaidaFutura.emailClienteQueSugeriu = this.emailUser;
        this.contaSaidaService.salvarContaParaLancamentosFuturos({...this.contaSaidaFutura}).subscribe(resultado=>{
          console.log(resultado)
        })  
    }
  
    if(this.destalhesLancamentoEntrada === "" ){
      this.destalhesLancamentoEntrada = "Sem descrição"
    }
  
    this.lancamentoSaida.identificador = this.identificador;
    this.lancamentoSaida.dataLancamentoSaida = this.datalancamentoSaida;
    this.lancamentoSaida.emailUserLancandoSaida = this.emailUser;
    this.lancamentoSaida.nomeUserLancandoSaida = this.nomeUser;
    this.lancamentoSaida.valorLancamentoSaida = this.valorlancamentoSaida;
    this.lancamentoSaida.nomeLancamentoSaida = this.contaSaidaLancamento;
    this.lancamentoSaida.detalhesLancamentoSaida = this.destalhesLancamentoEntrada;
    
    this.contaSaidaService.lancaSaida({...this.lancamentoSaida}).subscribe(resultado=>{
      console.log("Resultado API: ", resultado);

      if(resultado !== null){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Lançamento efetuado com sucesso!',
          showConfirmButton: false,
          timer: 1000
        })
        
        this.lancerFormSaida.reset();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Favor verifique as informações e/ou a conexão e tente novamente, se o problema persistir contate o administrado',         
        })
      }

      
    })
  
    console.log("Resultado ngModel", {...this.lancamentoSaida});
    console.log("Resultado form", {...this.lancerFormSaida.value})
  
  


  }

}
