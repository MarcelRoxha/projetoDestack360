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

  //variaveis para informacoes cliente recuperada

  identificadorInfo: string;
  razaoSocialInfo: string;
  cnpjInfo: string;
  usuarioclienteInfo: string;
  emailClienteInfo: string;
  telefoneInfo: string;
  celularInfo: string;
  createdInfo: string;
  modifiedInfo: string
  observacoes: string;



  //

  isProgressVisible: boolean;
  lancerForm: FormGroup;
  lancerFormSaida: FormGroup;
  lancerFormControl: FormControl;
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

  verificaClientesCadastrados: boolean = false;


// Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(private contaSaidaService: ContaSaidaService, private fb: FormBuilder,private contaEntradaService: ContaEntradaService,private _httpClient: HttpClient, private clienteservice: ClienteService, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
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
  }

  ngOnInit(): void {
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
        if(clientesCadastradosBanco === null){
        this.verificaClientesCadastrados = true;
          return;
        }
      })

     

      this.listaEntradasCadastradas.push(this.contaEntradaInicial);
this.contaEntradaService.listaContasEntradaSalvas().subscribe(constaEntradaSalva=>{
  this.listaEntradasCadastradas = constaEntradaSalva;
})


  }
  logout(): void {
    this.afAuth.signOut();
}
toggle(){
this.isOpen = !this.isOpen;
}

clickcliente(){
return this.clickCliente = !this.clickCliente;
}



recuperarInformarcoesClientesSelecionado(idClienteSelecionado: string){
  this.clienteservice.recuperarInformacoesCliente(idClienteSelecionado).subscribe(resultadoInfoCliente=>{

    this.identificadorInfo = resultadoInfoCliente.identificador;
    this.cnpjInfo = resultadoInfoCliente.cnpj;
    this.celularInfo = resultadoInfoCliente.celular;
    this.createdInfo = resultadoInfoCliente.created;
    this.modifiedInfo = resultadoInfoCliente.modified;
    this.emailClienteInfo = resultadoInfoCliente.emailCliente;
    this.razaoSocialInfo = resultadoInfoCliente.razaoSocial;
    this.telefoneInfo = resultadoInfoCliente.telefone;
    this.usuarioclienteInfo = resultadoInfoCliente.usuariocliente;
    this.observacoes = resultadoInfoCliente.obs;
    console.log("Recuperado foi ", resultadoInfoCliente);
  })

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
      this.contaSalvaParaLancamentosFuturos.identificadorCliente = this.cnpjInfo;
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
    
    this.LancamentoEntrada.identificador = this.identificadorInfo;
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
  
    this.lancamentoSaida.identificador = this.identificadorInfo;
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
