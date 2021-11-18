import { Component, OnInit } from '@angular/core';
import { UserModel } from './../models/UserModel';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserModelService } from '../services/user-model.service'

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

  animations:[
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '1250px',
        height: '1050px',
        opacity: 1,
        padding: '33px',
        backgroundColor: 'white',
        transform: 'translateX(-200px)'
      })),
      state('closed', style({
        width: '1050px',
        height: '1050px',       
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
export class FornecedorComponent implements OnInit {

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
  emailUser:string;
  nomeUser: string;
  userModel: UserModel = new UserModel;
  userModelRecuperado: UserModel;


  constructor(private cf: ChangeDetectorRef, public userModelService: UserModelService,  public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) { }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);
     
     
      if (user) {
        this.userModelRecuperado = new UserModel();
        
        let emailLower = user.email.toLowerCase();
        
        this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
        this.emailUser = emailLower;
        this.user.subscribe(resposta=>{
        this.nomeUser = resposta.displayName;
        console.log(this.nomeUser);  
        this.userModel.nomeUser = this.nomeUser;
        this.userModel.emailUser = this.emailUser;
        
      
      })             
    }
});
    
  }
  toggle(){
    this.isOpen = !this.isOpen;
    }
    logout(): void {
      this.afAuth.signOut();
  }
}
