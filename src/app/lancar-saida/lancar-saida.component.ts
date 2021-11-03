import { LancamentoSaida } from './../models/LancamentoSaidaModel';
import { ContaSaidaSalvaFutura } from './../models/ContaSaidaSalvaFutura';
import { ContaSaidaService } from './../services/conta-saida.service';
import { ContaSaida } from './../models/contaSaidaModel';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-lancar-saida',
  templateUrl: './lancar-saida.component.html',
  styleUrls: ['./lancar-saida.component.css'],

  animations:[
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '1250px',
        height: '520px',
        opacity: 1,
        padding: '33px',
        backgroundColor: 'white',
        transform: 'translateX(-200px)'
      })),
      state('closed', style({
        width: '1050px',
        height: '520px',       
        opacity: 0.8,
        padding: '33px',
        backgroundColor: 'white',        
      })),
      transition('* => *', [
        animate('1s'),
       
      ]),
    ]),
  ]
})
export class LancarSaidaComponent implements OnInit {

  user: Observable<any>;  
  loginForm: FormGroup; 
  isProgressVisible: boolean;
  lancerFormSaida: FormGroup;
  firebaseErrorMessage: string;
  clickDashBoard = false; 
  isOpen = false; 
  clickEfetuarLancamentoSaida = false;
  contaSaidaFutura: ContaSaidaSalvaFutura;
  dataRecuperada : string;

  datalancamentoSaida:string;
  valorlancamentoSaida: string;
  descricaoLancamento: string
  destalhesLancamentoEntrada: string;
  listaSaidasCadastradas: ContaSaida[] = [];
  contaSaidaInicial: ContaSaida;

  checkDigitarLancamento: boolean = false;
  salvarParaLancamentosFuturos: boolean = false;
  emailUser: string;
  nomeUser: string;

  lancamentoSaida:LancamentoSaida = new LancamentoSaida();
  contaSaidaLancamento: string;
  valorLancamento: string;
  dataLancamento: string;

  constructor(private contaSaidaService: ContaSaidaService, public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
    this.contaSaidaInicial = new ContaSaida();

    this.lancerFormSaida = new FormGroup({
      'datalancamentoSaida': new FormControl('', Validators.required),
      'valorlancamentoSaida': new FormControl('', [Validators.required]),
      'descricaoLancamento' : new FormControl('', Validators.required),
      'contaSaidaLancamento' : new FormControl('', Validators.required),
      'descricaolancamentoSaida' : new FormControl('', Validators.required)
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



  this.listaSaidasCadastradas.push(this.contaSaidaInicial);
  this.contaSaidaService.listaContasSaidaSalvas().subscribe(constaEntradaSalva=>{
    this.listaSaidasCadastradas = constaEntradaSalva;
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
 this.router.navigate(['/lancarEntrada'])
 
}

telaDashboard(){
  this.router.navigate(['/dashboard'])
}

acessoDigitarLancamentoSaida(){
this.checkDigitarLancamento = !this.checkDigitarLancamento;
}

salvarLancaMentoSaidaDigitada(){
  this.salvarParaLancamentosFuturos = !this.salvarParaLancamentosFuturos;

}
salvarLancamentoSaida(){

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

  this.lancamentoSaida.dataLancamentoSaida = this.datalancamentoSaida;
  this.lancamentoSaida.emailUserLancandoSaida = this.emailUser;
  this.lancamentoSaida.nomeUserLancandoSaida = this.nomeUser;
  this.lancamentoSaida.valorLancamentoSaida = this.valorlancamentoSaida;
  this.lancamentoSaida.nomeLancamentoSaida = this.contaSaidaLancamento;
  this.lancamentoSaida.detalhesLancamentoSaida = this.destalhesLancamentoEntrada;
  
  this.contaSaidaService.lancaSaida({...this.lancamentoSaida}).subscribe(resultado=>{
    console.log("Resultado API: ", resultado);
  })

  console.log("Resultado ngModel", {...this.lancamentoSaida});
  console.log("Resultado form", {...this.lancerFormSaida.value})


  this.lancerFormSaida = new FormGroup({
    'datalancamentoSaida': new FormControl('', Validators.required),
    'valorlancamentoSaida': new FormControl('', [Validators.required]),
    'descricaoLancamento' : new FormControl('', Validators.required),
    'contaSaidaLancamento' : new FormControl('', Validators.required),
    'descricaolancamentoSaida' : new FormControl('', Validators.required)
});

this.router.navigate(['/dashboard'])

}

}
