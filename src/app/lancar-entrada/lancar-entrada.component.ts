import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        width: '3000px',
        height: '2000px',
        opacity: 1,
        padding: '33px',
        backgroundColor: 'white',
        transform: 'translateX(-100px)'
      })),
      state('closed', style({
        width: '1050px',
        height: '2520px',       
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
export class LancarEntradaComponent implements OnInit {

  user: Observable<any>;  
  lancamentos : Observable<any>;

  isProgressVisible: boolean;
  lancerForm: FormGroup;
  firebaseErrorMessage: string;
  clickDashBoard = false; 
  isOpen = false;  
  dataRecuperada : string;
  emailUser: string;
  cont: number;
  cont2 : number;
  checkAnonimo: boolean = false;
  web : any;
  form: FormGroup;
  checkAnonimoEscolha: boolean = false;
  dataescolhida : string;
  valorentrada : string;
  infoentrada: string;


 

  constructor(private fb: FormBuilder, public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router, public service: AuthService) { 
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })
  }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);

      if (user) {
          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
          this.emailUser = emailLower;                  
      }
  });

  this.lancerForm = new FormGroup({
    'datalancamentoentrada': new FormControl('', Validators.required),
    'valorlancamentoentrada': new FormControl('', [Validators.required]),
    'infolancamentoentrada' : new FormControl('')
});

this.firestore.collection('users').doc(this.emailUser).collection('lancamento_entrada').snapshotChanges().subscribe(result =>{
  let troca = result;
  troca.indexOf.toString
});



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

salvarLancamentoEntrada(){
  console.log("data:", this.dataescolhida)
  console.log("data:", this.valorentrada)
  console.log("Lançamentos -> ", this.lancamentos)

  if(this.dataescolhida !== "" && this.valorentrada !== ""){

 
if(this.checkAnonimoEscolha === true){

  this.firestore.collection('users').doc(this.emailUser).collection('lancamento_entrada').doc().set({
    data : this.dataescolhida,    
    valor:  this.valorentrada,
    //codentrada: lancamento.codentrada,
    //codsaida: lancamento.codsaida, 
    info: 'Entrada Anonima'
  }).then(resultado =>{
    console.log("Resultado: ", resultado);
    
  });
}else{
  if(this.checkAnonimoEscolha === false){
    this.firestore.collection('users').doc(this.emailUser).collection('lancamento_entrada').doc().set({
      data : this.dataescolhida,    
      valor:  this.valorentrada,
      //codentrada: lancamento.codentrada,
      //codsaida: lancamento.codsaida, 
      info: this.infoentrada
    }).then(resultado =>{
      console.log("Resultado: ", resultado);
      
    });
  }
}

}else{
  console.log("Favor insiras as informações")
}



/** 
  if(this.checkAnonimo == true){



    this.service.eftLancer(this.lancerForm.value, this.emailUser, true).then(resultado =>{
      if(resultado === null){
        return;
      }else{
        console.log("Parece que funcionou:", resultado);
      }
    })
  }

  if(this.checkAnonimo == false){
   
    this.service.eftLancer(this.lancerForm.value, this.emailUser, false).then(resultado =>{
      if(resultado == null){
        return;
      }else{
        console.log("Parece que funcionou:", resultado);
      }
    })
  
  }

*/


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

}
