import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
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
  lancerForm: FormGroup;
  firebaseErrorMessage: string;
  clickDashBoard = false; 
  isOpen = false; 
  clickEfetuarLancamentoSaida = false;
  clickEfetuarLancamentoEntrada = false;
  dataRecuperada : string;

  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);

      if (user) {
          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges();                   
      }
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


}
