import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-tela-bancos',
  templateUrl: './tela-bancos.component.html',
  styleUrls: ['./tela-bancos.component.css'],
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
  ]
})
export class TelaBancosComponent implements OnInit {

 //CONFIGURAÇÕES INICIAS PADRÃO DA TELA
 user: Observable<any>; 
 isOpen = false; 


 constructor(private afAuth: AngularFireAuth, 
   private firestore: AngularFirestore,
   private router : Router) { }

 ngOnInit(): void {
   this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
     if (user) {
         let emailLower = user.email.toLowerCase();
         this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
              // get the user's doc in Cloud Firestore
     }
 });
 }

 logout(): void {
   this.afAuth.signOut();
}
toggle(){
 this.isOpen = !this.isOpen;
 }
}
