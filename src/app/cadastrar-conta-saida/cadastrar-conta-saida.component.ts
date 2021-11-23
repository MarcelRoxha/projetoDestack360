import { ContaSaida } from './../models/contaSaidaModel';
import { ContaSaidaService } from './../services/conta-saida.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-conta-saida',
  templateUrl: './cadastrar-conta-saida.component.html',
  styleUrls: ['./cadastrar-conta-saida.component.css'],
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
export class CadastrarContaSaidaComponent implements OnInit {

  user: Observable<any>; 
  isOpen = false; 
  isDisabled = false;
  clickCliente = false;    
  formCadastrarContaSaida: FormGroup
  msgParaUsuario: string = "";
  validadorMsgUsuario: boolean = false;
  
    // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(private consaSaidaService: ContaSaidaService, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
    this.router.navigate(['/cadastrarContaSaida']);
    
    this.formCadastrarContaSaida =  new FormGroup({
      codigoC: new FormControl('', Validators.required),
      codigoD: new FormControl('', Validators.required),
      servico: new FormControl('', Validators.required), 
      fornecedor: new FormControl('', Validators.required),       
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

cadastrarContaSaida(){
  console.log(this.formCadastrarContaSaida.value);
 

if(this.formCadastrarContaSaida.invalid){
  Swal.fire('Só é possível salvar conta de saída, se todas as informações estiverem preenchidas, verifique as informações e tente novamente')
  console.log("Invalido")
}else{
  const contaSaida : ContaSaida = {...this.formCadastrarContaSaida.value}
  this.consaSaidaService.cadastrarContaSaida(contaSaida)
  .subscribe(clienteBanco=>console.log(clienteBanco));

  if(contaSaida.codigoC !== "" || contaSaida.codigoD !== "" 
  || contaSaida.identificador !== "" 
  || contaSaida.fornecedor !== ""
  || contaSaida.descricaoServico !== ""){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Conta de Saída salva com sucesso',
      showConfirmButton: false,
      timer: 1000
    })
    this.validadorMsgUsuario = true;
    this.formCadastrarContaSaida.reset();
  }else{
    this.validadorMsgUsuario = true;
    Swal.fire('Erro desconhecido, favor contate o administrador')
    
  }


  
}

}
}
