import { Cliente } from './../models/clienteModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { ClienteService } from '../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css'],

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
export class CadastrarClienteComponent implements OnInit {

  clientes : Cliente [] =[];
  user: Observable<any>; 
  isOpen = false; 
  isDisabled = false;
  clickCliente = false;
  formCadastrarCliente: FormGroup;  
              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(private clienteservice: ClienteService, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
    this.router.navigate(['/cadastrarCliente']);
    
    this.formCadastrarCliente = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      usuariocliente: new FormControl('', Validators.required),
      emailCliente: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
    })

  }

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

clickcliente(){
return this.clickCliente = !this.clickCliente;
}

cadastrarCliente(){
  console.log(this.formCadastrarCliente.value);


  const cliente : Cliente = {...this.formCadastrarCliente.value}



  this.clienteservice.cadastrarCliente({...this.formCadastrarCliente.value}).then(()=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Conta de Saída salva com sucesso',
      showConfirmButton: false,
      timer: 1000, 
      confirmButtonText:'Ok'
    })
    this.formCadastrarCliente.reset();
  })
  
}

}
