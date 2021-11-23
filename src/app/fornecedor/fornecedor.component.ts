import { FornecedorService } from './../service/fornecedor.service';
import { FornecedorModel } from './../model/fornecedor-model';
import { Component, OnInit } from '@angular/core';
import { UserModel } from './../models/UserModel';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserModelService } from '../services/user-model.service'
import Swal from 'sweetalert2';

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
  formCadastrarFornecedor: FormGroup;
  forncedorModel: FornecedorModel;
  validadorMsgUsuario: boolean;


  constructor(private cf: ChangeDetectorRef, public userModelService: UserModelService,  
    public afAuth: AngularFireAuth, 
    private firestore: AngularFirestore, 
    private router : Router, 
    private fornecedorService: FornecedorService ) {

    this.formCadastrarFornecedor = new FormGroup({
      razaoSocial: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      endereco: new FormControl('', Validators.required),
      contaBancaria: new FormControl('', Validators.required),
      formadePagamento: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      contatoTelefonico: new FormControl('', Validators.required),
      tipoServico: new FormControl('', Validators.required),
    })
    this.forncedorModel= new FornecedorModel();
   }

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

  cadastrarFornecedor(){




    console.log("Clicado Cadastrar fornecedor");
    console.log("informações formControl: ", this.formCadastrarFornecedor.value);
    console.log("informações forncedor: ", this.forncedorModel);    
   

    if(this.formCadastrarFornecedor.invalid){
      this.fornecedorService.cadastrar({...this.forncedorModel})
      console.log("Dentro else", this.formCadastrarFornecedor.value)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Conta de Saída salva com sucesso',
        showConfirmButton: false,
        timer: 1000, 
        confirmButtonText:'Ok'
      })
      this.formCadastrarFornecedor.reset();
      this.validadorMsgUsuario = true;
 
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Favor Verifique as informações', 
        confirmButtonText:'Ok'
      })
    
    }

  }

}
