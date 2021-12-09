import { ContaCadastrada } from './../model/conta-cadastrada';
import { ContaEntrada } from './../models/contaEntradaModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { ContaEntradaService } from '../services/conta-entrada.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-conta-entrada',
  templateUrl: './cadastrar-conta-entrada.component.html',
  styleUrls: ['./cadastrar-conta-entrada.component.css'],
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
export class CadastrarContaEntradaComponent implements OnInit {

  formCadastrarContaEntrada: FormGroup;
  user: Observable<any>; 
  isOpen = false; 
  isDisabled = false;
  clickCliente = false;  
  contaCadastrarCompleta: ContaCadastrada ; 

  // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(private contaEntradaService: ContaEntradaService, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
    this.router.navigate(['/cadastrarContaEntrada']);

   
  }

  ngOnInit(): void {

    this.contaCadastrarCompleta = new ContaCadastrada();

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

clickcliente(){
return this.clickCliente = !this.clickCliente;
}
cadastrarContaEntrada(){
  console.log(this.formCadastrarContaEntrada.value);
  const contaEntrada : ContaEntrada = {...this.formCadastrarContaEntrada.value}
  this.contaEntradaService.cadastrarContaEntrada(contaEntrada)
  .subscribe(clienteBanco=>{

    if(clienteBanco == null){
      Swal.fire('É possível que esses dados já tenham sido cadastrados, favor verifique e tente novamente')
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Conta de Saída salva com sucesso',
        showConfirmButton: false,
        timer: 1000
      })
    }
    console.log(clienteBanco)});
  this.formCadastrarContaEntrada.reset();
    
}
cadastrarConta(contaCadastrarCompletaRecebida: ContaCadastrada){

  this.contaEntradaService.cadastrarConta({...this.contaCadastrarCompleta}).subscribe(resultadoAPiContaCadastrada=>{
    
    if(resultadoAPiContaCadastrada == 1){
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'DUPLICIDADE',
        showConfirmButton: true,         
        text: "Código já foi cadastrado em uma conta",
        confirmButtonText:'Ok'
      })
    }else if (resultadoAPiContaCadastrada == 2){
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'SUCESSO',
        showConfirmButton: true,        
        text: "Conta cadastrada com sucesso!",
        confirmButtonText:'Ok'
      })
      this.contaCadastrarCompleta = new ContaCadastrada();
    }else if (resultadoAPiContaCadastrada == 3){
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'FALTA INFORMAÇÃO',
        showConfirmButton: true,
        text: "Para cadastrar uma conta é necessário preencher todas as informações. Tente novamente",
        confirmButtonText:'Ok'
      })
    }
    
    console.log("Resultado conta Cadastrada: ",resultadoAPiContaCadastrada)
  })


  

}
}
