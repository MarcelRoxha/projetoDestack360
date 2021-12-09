import { RecuperarInformacoesCixaEmpresaCliente } from './../model/recuperarInformacoesCaixaEmpresaCliente';


import { FornecedorModel } from './../model/fornecedor-model';
import { ContaCaixa } from './../models/contaCaixaModel';
import { ContaSaidaSalvaFutura } from './../models/ContaSaidaSalvaFutura';
import { ContaSaidaService } from './../services/conta-saida.service';
import { UserModelService } from './../services/user-model.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ServicoFornecedorModel } from '../models/servicoFornecedorModel';
import { ContaEntradaCaixa } from '../model/conta-entrada-caixa';
import { ContaEntradaBanco } from '../model/conta-entrada-banco';



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
  empresasRecuperadas: EmpresaModel[] = [];
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
  nomeMaiusculo: string;
  cpf: string;
  usuariocliente: string;
  email: string;
  telefone: string;
  celular: string;
  created: string;
  modified: string;
  obs: string;
  status: string;  
  limparDadosLista: boolean = false;
  identificadorClienteSelecionado: string = '';

  clienteSelecionadoRecuperarInformacoes: Cliente = new Cliente()
  clienteSelecionadoInformacoes: any;

  data: Date = new Date();

  //--------LOADING-------------//
  firebaseErrorMessage: string;
  isProgressVisible: boolean ;
  isProgressVisibleCarregarLis: boolean = true;


  //-------FORMGROUP------------//

  cadastrarFormEmpresa: FormGroup;
  lancerFormSaida: FormGroup;
  lancerFormControl: FormControl;
  lancerFormCreditoCaixa: FormGroup;
  lancerFormCreditoBanco: FormGroup;
  lancerFormDebitoCaixa : FormGroup;
  lancerFormDebitoBanco : FormGroup;  

  lancerForm: FormGroup;
 
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
  LancamentoEntrada: LancamentoEntrada;
  lancamentoSaidaSalvoFuturo: ContaSaidaSalvaFutura = new ContaSaidaSalvaFutura();
  lancamentoSaida: LancamentoSaida = new LancamentoSaida();

  identificadorLancamentoEntrada:string;
  dataLancamento:string;
  valorLancamento: string;
  descricaoLancamento: string
  destalhesLancamentoEntrada: string;
  contaSaidaFutura: ContaSaidaSalvaFutura;
  codigoCredito: string;
  codigoDebito: string;

  //lancamentoSaida: any;
  datalancamentoSaida: string;
  valorlancamentoSaida: string;
  contaSaidaLancamento: any;
  descricaolancamentoSaida: any;

  //-------------Verificações------------------//

  verificaClientesCadastrados: boolean = false ;
  selecionadoServicoEFornecedor: boolean = false;
  verificaCelularWhats: boolean = false;
  verificaMostaEmpresas: boolean = false;
  verificLancarEntradaCaixa: boolean = true;
  verificLancarEntradaBanco: boolean = true;


  editarClienteSelecionado: boolean = false;

  msgEWhats: string = "SIM"

  lancarEntrada: boolean = false;

  //-------CONTA CAIXA-------//


  referenciaFirebase : RecuperarInformacoesCixaEmpresaCliente = new RecuperarInformacoesCixaEmpresaCliente();
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


  //--------------VALIDACAO CAMPOS OBRIGATORIOS-----------------//
  verificaRazaoSocial: boolean = false;
  msgErrorCNPJ: string ;
  msgErrorRazaoSocial: string ;
  msgErrorCEP: string ;
  verificaCNPJDigitado: boolean = false;
  verificaRazaoSocialDigitado: boolean = false;
  verificaCEPDigitado: boolean = false;
  verificaEnderecoDigitado: boolean = false;
  verificaCadastroEmpresaCompleto: boolean = false;

  clienteFoiSelecionado = false;



  //---------------FORNECEDOR--------------------//

  listaServicos: ServicoFornecedorModel [] =[];

  //----------CADASTRAR EMPRESA--------//

  empresaCadastrarCompleto: EmpresaModel;
  empresaCadastrar: any ;
  identificadorCliente: String ;
	cnpj: string ;
	endereco :string ;
  bairro: string;
  estado: string;
  complemento: string;
  cidade: string;
	emailEmpresa :string ;
	cep : any ;
	numero :string ;
	razaoSocial :string ;
	nomeEmpresa :string ;
  saldoCaixaCadastrar: string;
  saldoBancoCadastrar: string;
  codigoBanco: string;
  agencia: string;
  nconta: string;
  codigoCaixa: string = "5";
  verificaCadastroContaBanco: boolean = false;


  //--------------CADASTRAR CONTA CAIXA DE ACORDO COM A EMPRESA----------------//

  contaEntradaCaixaCadastro: ContaEntradaCaixa;
  contaEntradaBancoCadastro: ContaEntradaBanco;




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
  saldoBanco: string;
  saldoCaixa: string;

  codigoContaCaixa: number = 5;
  codigoContaBanco: number = 0;
  agenciaBanco: string = "01...";
  numeroContaBanco: string = "01..-01";

  //----------RECUPERAR INFORMAÇÕES EMPRESA CLIENTE--------//

  clienteRecuperaEmpresa : any = new Cliente();
  empresasCliente: any = new EmpresaModel();
  recuperarInformacoesEmpresaSelecionada : any = new RecuperarInformacoesCixaEmpresaCliente();




  //------------PREPARER DADOS CLIENTE EMPRESA PARA EFETUAR LANCAMENTO DE ENTRADA----------//

  identificadorRecuperadoClienteLancaEntrada: string;
  identificadorEmpresaClienteRecuperadoLancaEntrada: string;


  //---------------------LANÇAR CRÉDITO EMPRESA CLIENTE----------------//

  identificadorClientePreparer: string;
  identificadorEmpresaPreparer: string;


  //---------------------LANÇAR SAIDA ----------------------------------//
  fornecedor: string;
  fornecedoresModel: FornecedorModel [] = [];
  lancamentoSaidaCompleto: LancamentoSaida; 
  nomeFornecedorSelecionado: string;
  nomeServicoSelecionado: string;
  codigoCreditoSelecionado: string;
  codigoDebitoSelecionado: string; 
  valorSaidaDigitado:string;
  contaSaidaDigitada: string;
  dataSelecionada: string;
  




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
    this.fornecedoresModel = [];
    this.contaEntradaInicial = new ContaEntrada();



    this.empresaCadastrarCompleto = new EmpresaModel();
    this.contaEntradaBancoCadastro = new ContaEntradaBanco();

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
  'nomeEmpresa': new FormControl(''),
  'razaoSocial': new FormControl('', [Validators.required]),
  'cnpj' : new FormControl('', Validators.required),
  'telefone': new FormControl('', Validators.required),
	'celular': new FormControl('', Validators.required), 
  'endereco' : new FormControl('', Validators.required),
  'numero' : new FormControl('', Validators.required),
  'cep' : new FormControl('', Validators.required),
  'complemento' : new FormControl('', Validators.required),
  'email' : new FormControl('', Validators.required),
  'saldoCaixa' : new FormControl('', Validators.required),
  'saldoBanco' : new FormControl('', Validators.required),
});


//---------------------FORMULARIO CREDITO CAIXA -----------------//

this.lancerFormCreditoCaixa = new FormGroup({
  'dataLancamentoSaida': new FormControl('', Validators.required),
  'valorlancamentoSainda': new FormControl('', Validators.required),
  'contaEntrdaSelecionada' : new FormControl('', Validators.required),
  'fornecedor' : new FormControl( this.fornecedor),
  'servico' : new FormControl(this.nomeServicoSelecionado, Validators.required),
  'codigoCredito' : new FormControl('', Validators.required),
  'codigoDebito' : new FormControl('', Validators.required),
  

});

//---------------------FORMULARIO DEBITO CAIXA -----------------//


this.lancerFormDebitoCaixa = new FormGroup({
  'dataLancamentoEntrada': new FormControl('', Validators.required),
  'valorlancamentoentrada': new FormControl('' , Validators.required),
  'contaEntrdaSelecionada' : new FormControl('' , Validators.required),
  'descricaoLancamento' : new FormControl('' , Validators.required),

});
this.lancerForm = new FormGroup({
  'dataLancamentoEntrada': new FormControl(''),
  'valorlancamentoentrada': new FormControl(''),
  'contaEntrdaSelecionada' : new FormControl(''),
  'descricaoLancamento' : new FormControl(''),

});

//---------------------FORMULARIO DEBITO BANCO -----------------//

this.lancerFormDebitoBanco = new FormGroup({
  'dataLancamentoEntrada': new FormControl(''),
  'valorlancamentoentrada': new FormControl(''),
  'contaEntrdaSelecionada' : new FormControl(''),
  'descricaoLancamento' : new FormControl(''),

});

//---------------------FORMULARIO CREDITO BANCO -----------------//


this.lancerFormCreditoBanco = new FormGroup({
  'dataLancamentoEntrada': new FormControl(''),
  'valorlancamentoentrada': new FormControl(''),
  'contaEntrdaSelecionada' : new FormControl(''),
  'descricaoLancamento' : new FormControl(''),

});


this.contaEntradaCaixaCadastro = new ContaEntradaCaixa ();
  this.contaEntradaCaixaCadastro.codigoContaCaixa = 5;
  this.contaEntradaCaixaCadastro.historico = "CONTA CAIXA";
  this.contaEntradaCaixaCadastro.saldoCaixa = "";


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

      this.empresaCadastrarCompleto.nomeEmpresa = "";
      this.empresaCadastrarCompleto.cnpj = "";

     

      this.clienteservice.listarClientes().subscribe(clientesCadastradosBanco =>{
        this.clientes = clientesCadastradosBanco;
        this.clienteRecuperaEmpresa = this.clientes;
        this.isProgressVisibleCarregarLis = false;
          
      
        this.contaEntradaService.listaFornecedoresCadastrados().subscribe(resultadoFornecedores=>{
          this.fornecedoresModel = resultadoFornecedores;
          console.log("Forncedores recuperados: ",this.fornecedoresModel)
        })
       
       // console.log("Empresas Recuperadas: ",  this.clientes["cpf"])
        console.log("Clientes Recuperados: ", this.clientes)
        for(let i = 0; i < this.clientes.length ; i ++){
          

          console.log("Resultado cliente cpf: ", this.clientes[i].cpf)
          this.clienteservice.recuperarEmpresasCliente(this.clientes[i].cpf).subscribe(recuperadoEmpresas=>{
            console.log("Empresas Cliente recuperado: ", recuperadoEmpresas)
          })
        // this.recuperarinformacoesEmpresa(this.clienteRecuperaEmpresa[i].cpf);
        }
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



console.log("Resulrado valor: ", this.lancerFormCreditoCaixa.value('valorlancamentoSainda') )



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


//-------------------------------------------------------EMPRESAS CLIENTES------------------------------------------------------//



recuperarInformacoesEmpresaCliente(identificadorCliente: string){

  if(identificadorCliente !== ''){
    console.log("Entrou no if cpf recuperado: ", identificadorCliente);
    this.clienteservice.recuperarEmpresasCliente(identificadorCliente).subscribe(resultadoApi=>{
      this.empresasRecuperadas = resultadoApi;
    })
  }


}


cliqueinoCheck(){
  this.verificaCadastroContaBanco = !this.verificaCadastroContaBanco;
  console.log(this.verificaCadastroContaBanco);
  console.log("Cliquei no chec banco")
}


recuperarinformacoesEmpresa(identificadorCliente : string){
  this.referenciaFirebase = new RecuperarInformacoesCixaEmpresaCliente();
  this.identificadorClientePreparer = identificadorCliente;
  this.referenciaFirebase.identificadorCliente = identificadorCliente;


  
  this.clienteservice.recuperarEmpresasCliente(identificadorCliente).subscribe(ResultadoAPI=>{
    this.empresasRecuperadas = ResultadoAPI;
    if(this.empresasRecuperadas.length == 0){
      this.verificaMostaEmpresas = true;
    }
    
    console.log("Recuperar empresas API: ", ResultadoAPI)
  })

  this.clienteservice.recuperarEmpresaCadastradasCliente(identificadorCliente).subscribe(empresasRecuperadas =>{
    this.empresas = empresasRecuperadas;
  })

console.log("Identificador recuperado: ", identificadorCliente);
console.log("Empresaas recuperadas: ", this.empresas);
this.verificaMostaEmpresas = false;
}


lancarEntradaEmpresaCliente(identificadorEmpresa: string, identificadorCliente: string){
  this.lancarEntrada = !this.lancarEntrada; 
this.referenciaFirebase.identificadorEmpresa = identificadorEmpresa;  

  console.log("Entrou no entrada empresa")
  console.log("identificador empresa recuperado: ", identificadorEmpresa)
  console.log("identificador cliente recuperado: ", identificadorCliente)

  this.referenciaFirebase.identificadorCliente = identificadorCliente;
  this.referenciaFirebase.identificadorEmpresa = identificadorEmpresa;

  console.log("Recuperado Referencia: ", {...this.referenciaFirebase})

 // this.clienteservice.recuperarContaCaixaEmpresaCliente({...this.referenciaFirebase}).subscribe(resultadoAPI=>{
   // console.log("Informações da conta de caixa recuperado: ", resultadoAPI)
//  })



}

lancarSaidaEmpresaCliente(identificadorEmpresa: string, identificadorCliente: string){
  this.referenciaFirebase.identificadorCliente = identificadorCliente;
this.referenciaFirebase.identificadorEmpresa = identificadorEmpresa;
  console.log("Entrou no saida empresa")
  console.log("identificador empresa recuperado: ", identificadorEmpresa)
  console.log("identificador cliente recuperado: ", identificadorCliente)
}

clickcliente(){
return this.clickCliente = !this.clickCliente;
}

recuperarInformacoesEmpresaClienteLancaDebitoCaixa(identificadorCliente: string, identificaorEmpresa: string){


}

numeroWhatsapp(){
this.verificaCelularWhats = !this.verificaCelularWhats;
if(this.verificaCelularWhats == true){
this.empresaCadastrarCompleto.whatsapp = this.empresaCadastrarCompleto.celular;
console.log("Valor do whats é: ", this.empresaCadastrarCompleto.whatsapp);
}

}


verificaRaZaoSocialDigitado($event: any){


  this.empresaCadastrarCompleto.razaoSocial =  this.empresaCadastrarCompleto.razaoSocial;
   
  if(this.empresaCadastrarCompleto.razaoSocial == ""){
    this.msgErrorRazaoSocial = "Esse campo é obrigatório no cadastro de empresa"
    this.verificaRazaoSocialDigitado = true;
    
  } 
  this.verificaRazaoSocialDigitado = !this.verificaRazaoSocialDigitado;
  
}


cadastrarEmpresa(empresaRecebendo: EmpresaModel){
  this.validarCampoRazaoSocial;
  this.validacaoCNPJ();
  this.validarCampoCEP();
  let identificadorEmpresa = '';
  let identificadorCliente = '';


  if(this.validarCampoRazaoSocial()){
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Ops! Não foi possível concluir o cadastro, favor verifique as informações e se o problema persistir contate o administrador',
      showConfirmButton: true,
      
    })
    return 
  }

    if(this.validacaoCNPJ()){
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Ops! Não foi possível concluir o cadastro, favor verifique as informações e se o problema persistir contate o administrador',
        showConfirmButton: true,
        
      })
      return 
    }

    if(this.validarCampoCEP()){
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Ops! Não foi possível concluir o cadastro, favor verifique as informações e se o problema persistir contate o administrador',
        showConfirmButton: true,
        
      })
      return 
  
  
  }else{
    
    
    if(this.verificaCadastroContaBanco){
      console.log("Você cadastrou conta de banco: ")
      this.contaEntradaBancoCadastro.identificadorEmpresa = empresaRecebendo.cnpj;
      this.contaEntradaCaixaCadastro.identificadorEmpresa = empresaRecebendo.cnpj;
      empresaRecebendo.identificadorCliente = this.cpf
      identificadorEmpresa = empresaRecebendo.cnpj
      identificadorCliente =  empresaRecebendo.identificadorCliente;
      this.empresaCadastrarCompleto.identificadorCliente = this.cpf;
      this.empresaCadastrarCompleto.saldoCaixa = this.contaEntradaCaixaCadastro.saldoCaixa;
      this.empresaCadastrarCompleto.saldoBanco = this.contaEntradaBancoCadastro.saldoBanco;


      this.serviceEmpresa.cadastrarEmpresa({...this.empresaCadastrarCompleto}).subscribe(resultadoAPI=>{
        console.log("Recuperado da API cadastrar empresa: ",resultadoAPI )
      })
      this.serviceEmpresa.cadastrarContaCaixa({...this.contaEntradaCaixaCadastro},  identificadorEmpresa, identificadorCliente )
      this.serviceEmpresa.cadastrarContaBanco({...this.contaEntradaBancoCadastro},  identificadorEmpresa, identificadorCliente)
     

      console.log("Resultado conta banco: ",this.contaEntradaBancoCadastro);
      console.log("Resultado conta caixa: ",this.contaEntradaCaixaCadastro);
      console.log("Resultado empresa: ",empresaRecebendo);
      this.verificaCadastroEmpresaCompleto = true;

      this.contaEntradaCaixaCadastro = new ContaEntradaCaixa ();
      this.contaEntradaCaixaCadastro.codigoContaCaixa = 5;
      this.contaEntradaCaixaCadastro.historico = "CONTA CAIXA";
      this.contaEntradaCaixaCadastro.saldoCaixa = ""
      this.contaEntradaBancoCadastro = new ContaEntradaBanco ();
      this.empresaCadastrarCompleto = new EmpresaModel();    
      this.verificaCadastroEmpresaCompleto = !this.verificaCadastroEmpresaCompleto;

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'O CADASTRO EFETUADO ESTÁ COMPLETO',
        showConfirmButton: false,
        timer: 1500
      })

    }else{
      
      console.log("Você não cadastrou conta Banco:");
  
      if(this.contaEntradaCaixaCadastro.saldoCaixa == ""){
        console.log("Não foi digitado um valor de saldo, por padrão será 0")
        this.contaEntradaCaixaCadastro.saldoCaixa = "0"
        this.contaEntradaCaixaCadastro.identificadorEmpresa = empresaRecebendo.cnpj;
        empresaRecebendo.identificadorCliente = this.cpf
        this.empresaCadastrarCompleto.identificadorCliente = this.cpf;
        this.empresaCadastrarCompleto.saldoCaixa = this.contaEntradaCaixaCadastro.saldoCaixa;
        this.empresaCadastrarCompleto.saldoBanco = this.contaEntradaBancoCadastro.saldoBanco;
        this.serviceEmpresa.cadastrarEmpresa({...this.empresaCadastrarCompleto}).subscribe(resultadoAPI=>{
          console.log("Recuperado da API cadastrar empresa: ",resultadoAPI )
        })
        this.serviceEmpresa.cadastrarContaCaixa({...this.contaEntradaCaixaCadastro},  identificadorEmpresa, identificadorCliente )
      console.log("Resultado empresa: ",{...this.contaEntradaCaixaCadastro});
      console.log("Resultado Empresa recebida: ", empresaRecebendo);
      this.verificaCadastroEmpresaCompleto = true;
      this.contaEntradaCaixaCadastro = new ContaEntradaCaixa ();
      this.contaEntradaCaixaCadastro.codigoContaCaixa = 5;
      this.contaEntradaCaixaCadastro.historico = "CONTA CAIXA";
      this.contaEntradaCaixaCadastro.saldoCaixa = ""
      this.contaEntradaBancoCadastro = new ContaEntradaBanco ();
      this.empresaCadastrarCompleto = new EmpresaModel();    
      this.verificaCadastroEmpresaCompleto = !this.verificaCadastroEmpresaCompleto;
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Atenção, você cadastrou a empresa, porém, não cadastrou o banco, você pode fazer isso a qualquer momento no painel de controle',
        showConfirmButton: true,
        
      })



      }else{
        console.log("Você digitou um saldo")
        this.contaEntradaCaixaCadastro.identificadorEmpresa = empresaRecebendo.cnpj;
        empresaRecebendo.identificadorCliente = this.cpf
        identificadorEmpresa = empresaRecebendo.cnpj
        identificadorCliente =  empresaRecebendo.identificadorCliente;
        this.empresaCadastrarCompleto.identificadorCliente = this.cpf;
        this.empresaCadastrarCompleto.saldoCaixa = this.contaEntradaCaixaCadastro.saldoCaixa;
        this.empresaCadastrarCompleto.saldoBanco = this.contaEntradaBancoCadastro.saldoBanco;
        console.log("Resultado empresa: ",this.empresaCadastrarCompleto);
        this.serviceEmpresa.cadastrarEmpresa({...this.empresaCadastrarCompleto}).subscribe(resultadoAPI=>{
          console.log("Recuperado da API cadastrar empresa: ",resultadoAPI )
        })
        this.serviceEmpresa.cadastrarContaCaixa({...this.contaEntradaCaixaCadastro},  identificadorEmpresa, identificadorCliente )

        
        console.log("Resultado Empresa recebida: ", empresaRecebendo);
        this.verificaCadastroEmpresaCompleto = true;
        this.contaEntradaCaixaCadastro = new ContaEntradaCaixa ();
        this.contaEntradaCaixaCadastro.codigoContaCaixa = 5;
        this.contaEntradaCaixaCadastro.historico = "CONTA CAIXA";
        this.contaEntradaCaixaCadastro.saldoCaixa = ""
        this.contaEntradaBancoCadastro = new ContaEntradaBanco ();
        this.empresaCadastrarCompleto = new EmpresaModel();    
        this.verificaCadastroEmpresaCompleto = !this.verificaCadastroEmpresaCompleto;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'CADASTRO PARCIAL COMPLETO',
          showConfirmButton: false,
          timer: 1500
        })

        Swal.fire({
          position: 'top',
          icon: 'info',
          title: 'Atenção, você cadastrou a empresa, porém, não cadastrou o banco, você pode fazer isso a qualquer momento no painel de controle',
          showConfirmButton: true,
          
        })
       
       
      }
    
    }

  
    
  
    // console.log("Resultado Empresa recebida: ", empresaRecebendo);
    //  console.log("Resultado Conta Caixa: " , this.contaEntradaCaixaCadastro);
  
    
  
  
 // console.log(empresaRecebendo);
  return true;
  }



  
}

@ViewChild('exampleModalLancars') exampleModalLancars: any;

lancarEntradaContaBanco(){
  this.contaBanco = new ContaBancoModel();
  this.contaBanco.dataLancamentoContaBanco = this.dataLancamentoContaBanco;
  this.contaBanco.valorLancamentoContaBanco = this.valorLancamentoContaBanco;
  this.contaBanco.destalhesLancamentoContaBanco = this.destalhesLancamentoContaBanco;
  this.contaBanco.descricaoLancamentoContaBanco = this.descricaoLancamentoContaBanco;
console.log("Lançar conta Banco: ", this.contaBanco);

}

recuperarInformacoesCliente(clienteSelecionado: Cliente){
console.log("Selecionado o cliente: ", clienteSelecionado)
}

selecionarFornecedor(identificadorFornecedor: string){
console.log("identificador fornecedor recuperado: ", identificadorFornecedor)
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

  this.identificadorRecuperadoClienteLancaEntrada = identificadorCliente;
  this.identificadorEmpresaClienteRecuperadoLancaEntrada = identificadorEmpresa;



  
 

}
preparerLancarCreditoBanco(identificadorCliente:string, identificadorEmpresa: string){
  this.identificadorRecuperadoClienteLancaEntrada = identificadorCliente;
  this.identificadorEmpresaClienteRecuperadoLancaEntrada = identificadorEmpresa;

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
    this.nomeMaiusculo = this.nome.toUpperCase();
  })



 

}

efetuarCreditoCaixa(){
  this.LancamentoEntrada = new LancamentoEntrada();

  if(this.destalhesLancamentoEntrada === "" ){
    this.destalhesLancamentoEntrada = "Sem descrição"
  }

  this.LancamentoEntrada.dataLancamentoEntrada = this.dataLancamento;
  this.LancamentoEntrada.emailUserLancandoEntrada = this.emailUser;
  this.LancamentoEntrada.nomeUserLancandoEntrada = this.nomeUser;
  this.LancamentoEntrada.valorLancamentoEntrada = this.valorLancamento;
  this.LancamentoEntrada.nomeLancamentoEntrada = this.descricaoLancamento;
  this.LancamentoEntrada.detalhesLancamentoEntrada = this.destalhesLancamentoEntrada;
  this.LancamentoEntrada.identificador = this.identificadorRecuperadoClienteLancaEntrada;
  this.LancamentoEntrada.identificadorEmpresa = this.identificadorEmpresaClienteRecuperadoLancaEntrada;
  
  this.contaEntradaService.lancarEntrada({...this.LancamentoEntrada}).subscribe(resultado=>{
    console.log("Resultado API: ", resultado);
  })  

  console.log("Resultado ngModel", {...this.LancamentoEntrada});
  console.log("Resultado form", {...this.lancerFormCreditoCaixa.value})


  this.lancerFormDebitoCaixa = new FormGroup({
    'dataLancamentoEntrada': new FormControl(''),
    'valorlancamentoentrada': new FormControl(''),
    'contaEntrdaSelecionada' : new FormControl(''),
    'descricaoLancamento' : new FormControl(''),

});



}

recarregarPaginarOkEntendi(){
  window.location.reload();
}

efetuarCreditoBanco(){

  this.LancamentoEntrada = new LancamentoEntrada();

  if(this.destalhesLancamentoEntrada === "" ){
    this.destalhesLancamentoEntrada = "Sem descrição"
  }

  this.LancamentoEntrada.dataLancamentoEntrada = this.dataLancamento;
  this.LancamentoEntrada.emailUserLancandoEntrada = this.emailUser;
  this.LancamentoEntrada.nomeUserLancandoEntrada = this.nomeUser;
  this.LancamentoEntrada.valorLancamentoEntrada = this.valorLancamento;
  this.LancamentoEntrada.nomeLancamentoEntrada = this.descricaoLancamento;
  this.LancamentoEntrada.detalhesLancamentoEntrada = this.destalhesLancamentoEntrada;
  this.LancamentoEntrada.identificador = this.identificadorRecuperadoClienteLancaEntrada;
  this.LancamentoEntrada.identificadorEmpresa = this.identificadorEmpresaClienteRecuperadoLancaEntrada;
  
  this.contaEntradaService.lancarEntradaBanco({...this.LancamentoEntrada}).subscribe(resultado=>{
    console.log("Resultado API: ", resultado);
  })  

  console.log("Resultado ngModel", {...this.LancamentoEntrada});
  console.log("Resultado form", {...this.lancerFormDebitoCaixa.value})


  this.lancerFormDebitoCaixa = new FormGroup({
    'dataLancamentoEntrada': new FormControl(''),
    'valorlancamentoentrada': new FormControl(''),
    'contaEntrdaSelecionada' : new FormControl(''),
    'descricaoLancamento' : new FormControl(''),

});

  
}
acessoDigitarLancamentoEntrada(){ 
  this.selecionadoServicoEFornecedor = false; 
  this.checkDigitarLancamento = !this.checkDigitarLancamento;
  this.codigoCredito = "17";
  this.codigoCredito = "06";
 
 if(this.checkDigitarLancamento == true){
   this.descricaoLancamento = '';
 }

this.contaEntradaService.listaContasEntradaSalvas().subscribe(constaEntradaSalva=>{
  this.listaEntradasCadastradas = constaEntradaSalva;
})
 
}

selecioneiFornecedor(identificadorFornecedor:string, nomeFornecedor: string){  

  this.contaEntradaService.recuperarServicosFornecedor(identificadorFornecedor).subscribe(listaServicos=>{
      this.listaServicos = listaServicos;
      this.lancamentoSaidaCompleto.fornecedor = nomeFornecedor;
      console.log("Recuperado identificador fornecedor: ", identificadorFornecedor);
  })
  
  

 
}

selecionarFornecedorEServicoNovamente(){
  this.lancamentoSaidaCompleto.fornecedor = "";
  this.lancamentoSaidaCompleto.servico = "";
  this.lancamentoSaidaCompleto.codigoContaCredito = "";
  this.lancamentoSaidaCompleto.codigoContaDebito = "";
  this.selecionadoServicoEFornecedor = false;
  console.log("Resetado os dados: ", this.lancamentoSaidaCompleto)

}

selecioneiServico(servico: ServicoFornecedorModel){
  this.selecionadoServicoEFornecedor = true

  this.nomeServicoSelecionado = servico.descricaoServico;
  this.lancamentoSaidaCompleto.servico = servico.descricaoServico;
  this.codigoCredito = servico.codigoContaCredito;
  this.codigoDebito = servico.codigoContaDebito;
  console.log("identificador servivo recuperado: ", this.lancamentoSaidaCompleto);


  this.selecionadoServicoEFornecedor = true
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


  lancarSaidaCompleta(){
    
  

    if(this.checkDigitarLancamento){

      this.lancamentoSaidaCompleto.fornecedor = this.fornecedor;
      this.lancamentoSaidaCompleto.codigoContaCredito = this.codigoCredito
      this.lancamentoSaidaCompleto.codigoContaDebito = this.codigoDebito

      this.lancamentoSaidaCompleto.valorLancamentoSaida = this.valorlancamentoSaida;
      this.lancamentoSaidaCompleto.dataLancamentoSaida = this.datalancamentoSaida;
      this.lancamentoSaidaCompleto.emailUserLancandoSaida = this.emailUser;
      this.lancamentoSaidaCompleto.nomeUserLancandoSaida = this.nomeUser;
      this.lancamentoSaidaCompleto.servico = this.fornecedor;
      this.contaEntradaService.lancarSaida(this.lancamentoSaidaCompleto).subscribe(resultado=>{
        console.log("Recuperado Banco: ", resultado)
      })
      console.log("Informações check true: ", this.lancamentoSaidaCompleto);
      this.lancamentoSaidaCompleto = new LancamentoSaida ();

    }else{


      this.lancamentoSaidaCompleto = new LancamentoSaida (); 

      this.lancamentoSaidaCompleto.valorLancamentoSaida = this.valorlancamentoSaida;
      this.lancamentoSaidaCompleto.dataLancamentoSaida = this.datalancamentoSaida
      this.lancamentoSaidaCompleto.codigoContaDebito = this.codigoDebito;
      this.lancamentoSaidaCompleto.codigoContaCredito = this.codigoCredito;
      this.lancamentoSaidaCompleto.emailUserLancandoSaida = this.emailUser;
      this.lancamentoSaidaCompleto.nomeUserLancandoSaida = this.nomeUser;
      
      
      this.contaEntradaService.lancarSaida(this.lancamentoSaidaCompleto).subscribe(resultado=>{
        console.log("Recuperado Banco: ", resultado)
      })

      console.log("Informações check false: ", this.lancamentoSaidaCompleto);
      console.log("Informações check false form: ", {...this.lancerFormCreditoCaixa.value});
      
      this.lancamentoSaidaCompleto = new LancamentoSaida ();
    }
       
    
    
    

 

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
    this.LancamentoEntrada.codigoContaCredito = this.codigoCredito;
    this.LancamentoEntrada.codigoContaDebito = this.codigoDebito;
    
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
    this.empresaCadastrar.saldoCaixa =this.saldoCaixa;
    this.empresaCadastrar.saldoBanco =this.saldoBanco;

    if(this.empresaCadastrar){
      
      console.log("empresaCadastrar: ", this.empresaCadastrar)
      this.serviceEmpresa.cadastrarEmpresaClienteAPI({...this.empresaCadastrar}).subscribe(Resultado=>{
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

  consultarCEP($event: any){
    
    this.empresaCadastrarCompleto.cep = this.empresaCadastrarCompleto.cep.replace(/\D/g, '');

    if (this.empresaCadastrarCompleto.cep != "") {
      var validacep = /^[0-9]{8}$/;

       //Valida o formato do CEP.
       if(validacep.test(this.empresaCadastrarCompleto.cep)) {
        this._httpClient.get(`https://viacep.com.br/ws/${this.empresaCadastrarCompleto.cep}/json/`).subscribe(resultadoCep=>{
          let empresa : any = new EmpresaModel()
          empresa = resultadoCep;
        this.popularDadosEndereco(empresa)
        })
       }else{
        if(this.empresaCadastrarCompleto.razaoSocial.length < 2){
          this.msgErrorCEP = "Digite um CEP válido"
          this.verificaCEPDigitado = true;
         }
         console.log("CEP invalido")

       }

    }else{

      if(this.empresaCadastrarCompleto.cep = ""){
        this.msgErrorCEP = "Esse campo é obrigatório no cadastro de empresa"
        this.verificaCEPDigitado = true;
      }
      console.log("Cep vazio")
    }


   
    
  
 
 
  }

  popularDadosEndereco(empresa: any){
    
    this.empresaCadastrarCompleto.endereco = empresa.logradouro;
    this.empresaCadastrarCompleto.bairro = empresa.bairro;
    this.empresaCadastrarCompleto.complemento = empresa.complemento;
    this.empresaCadastrarCompleto.estado = empresa.uf;
    this.empresaCadastrarCompleto.cidade = empresa.localidade;
    
    console.log("Resultado: ", empresa)

  }

  consultarCNPJ($event: any){

    this.empresaCadastrarCompleto.cnpj = this.empresaCadastrarCompleto.cnpj.replace(/\D/g, '');

    if(this.empresaCadastrarCompleto.cnpj === ''){
      return false;
    }
    
    if(this.empresaCadastrarCompleto.cnpj.length !== 14){
      return false;
    }

    if (this.empresaCadastrarCompleto.cnpj == "00000000000000" || 
    this.empresaCadastrarCompleto.cnpj == "11111111111111" || 
    this.empresaCadastrarCompleto.cnpj == "22222222222222" || 
    this.empresaCadastrarCompleto.cnpj == "33333333333333" || 
    this.empresaCadastrarCompleto.cnpj == "44444444444444" || 
    this.empresaCadastrarCompleto.cnpj == "55555555555555" || 
    this.empresaCadastrarCompleto.cnpj == "66666666666666" || 
    this.empresaCadastrarCompleto.cnpj == "77777777777777" || 
    this.empresaCadastrarCompleto.cnpj == "88888888888888" || 
    this.empresaCadastrarCompleto.cnpj == "99999999999999"){
    return false;
        }

        this._httpClient.get("https://www.receitaws.com.br/v1/cnpj/" + 61695227000193 + "").subscribe(resultadoConsultaCNPJ =>{
          console.log("Resultado receita federal ", resultadoConsultaCNPJ)
        
        let empresaRecuperadaReceita : any = new EmpresaModel();
          empresaRecuperadaReceita = resultadoConsultaCNPJ;

          this.popularDadosEmpresaComCNPJ(empresaRecuperadaReceita)

        })
        
        
        
     
    return true;

  }

  validacaoCNPJ(){

  if(this.empresaCadastrarCompleto.cnpj == ''){
      this.msgErrorCNPJ = "Esse campo é obrigatório"
      this.verificaCNPJDigitado = true;
      return true;
      
    }
    
    if(this.empresaCadastrarCompleto.cnpj.length == 14 || this.empresaCadastrarCompleto.cnpj.length == 12  ){
      this.verificaCNPJDigitado = false;
      return false;
  
    }


    this.verificaCNPJDigitado = !this.verificaCNPJDigitado;

    if (this.empresaCadastrarCompleto.cnpj == "00000000000000" || 
    this.empresaCadastrarCompleto.cnpj == "11111111111111" || 
    this.empresaCadastrarCompleto.cnpj == "22222222222222" || 
    this.empresaCadastrarCompleto.cnpj == "33333333333333" || 
    this.empresaCadastrarCompleto.cnpj == "44444444444444" || 
    this.empresaCadastrarCompleto.cnpj == "55555555555555" || 
    this.empresaCadastrarCompleto.cnpj == "66666666666666" || 
    this.empresaCadastrarCompleto.cnpj == "77777777777777" || 
    this.empresaCadastrarCompleto.cnpj == "88888888888888" || 
    this.empresaCadastrarCompleto.cnpj == "99999999999999"){
      this.msgErrorCNPJ = "Dado cadastral invalido"
      this.verificaCNPJDigitado = true;
       return true;
        }

   //     this._httpClient.get("https://www.receitaws.com.br/v1/cnpj/" + 61695227000193 + "").subscribe(resultadoConsultaCNPJ =>{
        //  console.log("Resultado receita federal ", resultadoConsultaCNPJ)
        
        //let empresaRecuperadaReceita : any = new EmpresaModel();
        //  empresaRecuperadaReceita = resultadoConsultaCNPJ;

        //  this.popularDadosEmpresaComCNPJ(empresaRecuperadaReceita)

      //  })
      this.verificaCNPJDigitado = false;
    return false;
  }

  validarCampoRazaoSocial(){
    
   if(this.empresaCadastrarCompleto.razaoSocial == ''){
     this.msgErrorRazaoSocial = "Esse campo é obrigatório no cadastro de empresa"
     this.verificaRazaoSocialDigitado = true;
     return true;
   }    
    return false;
  }

  validarCampoCEP(){
    
    if(this.empresaCadastrarCompleto.cep == ''){
      this.msgErrorCEP = "Esse campo é obrigatório no cadastro de empresa"
      this.verificaCEPDigitado = true;
      return true;
    } 
     return false;
   }

  popularDadosEmpresaComCNPJ(empresa: any){
    console.log("Resultado CNPJ: ", empresa)

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

  confirmarFornecedor(identificadorFornecedor: string){


    console.log("cnpj recuperado: ", identificadorFornecedor)
  }

  validacaoDosCamposObrigatorios(){

  }

  verificaWhatsCelular(){
    this.verificaCelularWhats = this.verificaCelularWhats;
  }

  
  lancarEntradaCaixa(){
    this.referenciaFirebase = new RecuperarInformacoesCixaEmpresaCliente();

    this.referenciaFirebase.identificadorCliente = this.identificadorClientePreparer;
    this.referenciaFirebase.identificadorEmpresa = this.identificadorEmpresaPreparer;
  
    console.log("Recuperado Referencia: ", {...this.referenciaFirebase})

    this.clienteservice.recuperarContaCaixaEmpresaCliente({...this.referenciaFirebase}).subscribe(resultadoAPI=>{
      console.log("Informações da conta de caixa recuperado: ", resultadoAPI)
    })
   
    this.verificLancarEntradaBanco = !this.verificLancarEntradaBanco;

  }
  lancarEntradaBanco(){


  }
  voltarBotoes(){
    this.verificLancarEntradaCaixa = true
    this.verificLancarEntradaBanco = true;
  }
clienteSelecionado(event: any){
  
  this.isProgressVisible = true;
  this.identificadorClienteSelecionado = event
  if(event == 1){
    this.isProgressVisible = false; 
    this.clienteFoiSelecionado = !this.clienteFoiSelecionado;
    console.log("Entrou no if ", this.clienteFoiSelecionado)
    this.clienteSelecionadoRecuperarInformacoes = new Cliente
  }else{

    this.clienteservice.recuperarInformacoesCliente(event).subscribe(informacoesCliete=>{

      if(informacoesCliete){
        this.clienteSelecionadoRecuperarInformacoes = informacoesCliete

        this.recuperarInformacoesEmpresaCliente(event)
        console.log("Cliente Recuperado foi: ", informacoesCliete)
        
      }

    })

    this.isProgressVisible = false; 
    console.log("Cliente Recuperado: ", this.identificadorClienteSelecionado)
    this.clienteFoiSelecionado = true;
  }

  
 // if (result == null){                                 // null is success, false means there was an error
   // this.firebaseErrorMessage = result.message;

   
    
   // }else if (result.isValid == false){
    //  this.firebaseErrorMessage = result.message;

     // this.isProgressVisible = false; 
   // }else{
     // this.router.navigate(['/dashboard']);
   // }
}
editarClienteSelecionadoed(){
  this.editarClienteSelecionado = true;
}
voltarEditarClienteSelecionado(){
  this.editarClienteSelecionado = false;

}
}
