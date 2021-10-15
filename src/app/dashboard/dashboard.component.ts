import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

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
export class DashboardComponent implements OnInit {

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


  //Grafico
  canvas: any;
  ctx: any;
  @ViewChild('myChart') myChart: any;


      // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

    constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
      this.router.navigate(['/dashboard']);    
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            console.log('Dashboard: user', user);

            if (user) {
                let emailLower = user.email.toLowerCase();
                this.user = this.firestore.collection('users').doc(emailLower).valueChanges();                   
            }
        });
       
        this.lancerForm = new FormGroup({
          'dataEscolhida' : new FormControl(''),
          'valorDigitado' : new FormControl(''),
          'fornecedorEscolhido' : new FormControl('')

        })
       
    }

    logout(): void {
      this.afAuth.signOut();
  }

  toggle(){
    this.isOpen = !this.isOpen;
    }

    efetuarLancamentoSaida(){  
      this.router.navigate(['/lancarSaida'])
     
      
    }

    efetuarLancamentoEntrada(){
     this.router.navigate(['/lancarEntrada'])
     
    }

    retornarData(){
      console.log(this.lancerForm.value) 
    }
  
}
