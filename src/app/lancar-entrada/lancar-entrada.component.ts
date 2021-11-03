import { ContaEntradaService } from './../services/conta-entrada.service';
import { ContaEntrada } from './../models/contaEntradaModel';
import { LancamentoEntrada } from './../models/lancamentoEntradaModel';
import { ContaEntradaSalvaFutura } from './../models/lancamentoEntradaSalvoFuturo';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-lancar-entrada',
  templateUrl: './lancar-entrada.component.html',
  styleUrls: ['./lancar-entrada.component.css'],
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
export class LancarEntradaComponent implements OnInit {

  user: Observable<any>;  
  lancamentos : Observable<any>;

  isProgressVisible: boolean;
  lancerForm: FormGroup;
  lancerFormControl: FormControl;
  firebaseErrorMessage: string;
  clickDashBoard = false; 
  isOpen = false;  
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
  salvarParaLancamentosFuturos: boolean =false;
  contaSalvaParaLancamentosFuturos : ContaEntradaSalvaFutura;
  LancamentoEntrada: LancamentoEntrada = new LancamentoEntrada();

  dataLancamento:string;
  valorLancamento: string;
  descricaoLancamento: string
  destalhesLancamentoEntrada: string;
  

 

  constructor(private contaEntradaService: ContaEntradaService,private fb: FormBuilder, public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router, public service: AuthService) { 
    
    this.contaEntradaInicial = new ContaEntrada();

    this.lancerForm = new FormGroup({
      'dataLancamentoEntrada': new FormControl(''),
      'valorlancamentoentrada': new FormControl(''),
      'contaEntrdaSelecionada' : new FormControl(''),
      'descricaoLancamento' : new FormControl(''),
  
  });
  
  }
 

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);

      if (user) {
          let emailLower = user.email.toLowerCase();
          
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
          this.emailUser = emailLower;
          this.user.subscribe(resposta=>{
             this.nomeUser = resposta.displayName;
          })
          
                         
      }
  });





this.listaEntradasCadastradas.push(this.contaEntradaInicial);
this.contaEntradaService.listaContasEntradaSalvas().subscribe(constaEntradaSalva=>{
  this.listaEntradasCadastradas = constaEntradaSalva;
})


  }
  toggle(){
    this.isOpen = !this.isOpen;
    }

  logout(): void {
    this.afAuth.signOut();
}

efetuarLancamentoSaida(){  
  this.router.navigate(['/lancarSaida'])
 
  
}

efetuarLancamentoEntrada(){
console.log(this.lancerForm.value);
console.log();
}

telaDashboard(){
  this.router.navigate(['/dashboard'])
}

salvarLancamentoEntrada(){

  if(this.salvarParaLancamentosFuturos == true){
    this.contaSalvaParaLancamentosFuturos = new ContaEntradaSalvaFutura();
    this.contaSalvaParaLancamentosFuturos.nomeContaEntradaLancamentoFuturos = this.descricaoLancamento;
    this.contaSalvaParaLancamentosFuturos.emailClienteQueSugeriu = this.emailUser;
      this.contaEntradaService.salvarContaParaLancamentosFuturos({...this.contaSalvaParaLancamentosFuturos}).subscribe(resultado=>{
        console.log(resultado)
      })

  }


  if(this.destalhesLancamentoEntrada === "" ){
    this.destalhesLancamentoEntrada = "Sem descrição"
  }

  this.LancamentoEntrada.dataLancamentoEntrada = this.dataLancamento;
  this.LancamentoEntrada.emailUserLancandoEntrada = this.emailUser;
  this.LancamentoEntrada.nomeUserLancandoEntrada = this.nomeUser;
  this.LancamentoEntrada.valorLancamentoEntrada = this.valorLancamento;
  this.LancamentoEntrada.nomeLancamentoEntrada = this.descricaoLancamento;
  this.LancamentoEntrada.detalhesLancamentoEntrada = this.destalhesLancamentoEntrada;
  
  this.contaEntradaService.lancarEntrada({...this.LancamentoEntrada}).subscribe(resultado=>{
    console.log("Resultado API: ", resultado);
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
window.location.reload();

}
declaroAnonimo(){
this.checkAnonimo = !this.checkAnonimo;
console.log('check Anonimo:')
}

AnonimoClick(){
  this.checkAnonimoEscolha = !this.checkAnonimoEscolha;  
}
  
submit(){
  console.log(this.form.value);
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


}

