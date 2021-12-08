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
import { HttpClient } from '@angular/common/http';

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
  clienteCadastroCompleto: Cliente = new Cliente();
  verificaCelularWhats: boolean = false;

  codigoConta: string;

              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(private clienteservice: ClienteService, 
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore, 
    private router : Router,
    private _httpClient: HttpClient) {
    this.router.navigate(['/cadastrarCliente']);
    
    this.formCadastrarCliente = new FormGroup({
      nome: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      usuariocliente: new FormControl('', Validators.required),
      emailCliente: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      codigoConta: new FormControl('', Validators.required),
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

consultarCEP($event: any){
    
  this.clienteCadastroCompleto.cep = this.clienteCadastroCompleto.cep.replace(/\D/g, '');

  if (this.clienteCadastroCompleto.cep != "") {
    var validacep = /^[0-9]{8}$/;

     //Valida o formato do CEP.
     if(validacep.test(this.clienteCadastroCompleto.cep)) {
      this._httpClient.get(`https://viacep.com.br/ws/${this.clienteCadastroCompleto.cep}/json/`).subscribe(resultadoCep=>{
   
      this.popularDadosEndereco(resultadoCep)
    
      })
     }else{       
       console.log("CEP invalido")

     }

  }else{
  
    console.log("Cep vazio")
  }


}

popularDadosEndereco(empresa: any){
    
  this.clienteCadastroCompleto.endereco = empresa.logradouro;
  this.clienteCadastroCompleto.bairro = empresa.bairro;
  this.clienteCadastroCompleto.complemento = empresa.complemento;
  this.clienteCadastroCompleto.estado = empresa.uf;
  this.clienteCadastroCompleto.cidade = empresa.localidade;
  
  console.log("Resultado: ", empresa)

}

cadastrarCliente(clienteRecebido: Cliente){
 let dataCreated : Date = new Date();
 let mesCadastro: number;
 let diaCadastro: string;
 let anoCadastro: string;
 let horaCadastro: string;
 let minutoCadastro: string;
 let segundoCadastro: string;
 let dataCompletaRecuperada: string;

 

  mesCadastro = dataCreated.getMonth()+1;
  diaCadastro = dataCreated.getDate().toString();
  anoCadastro = dataCreated.getFullYear().toString();
  horaCadastro = dataCreated.getHours().toString();
  minutoCadastro = dataCreated.getMinutes().toString();
  segundoCadastro = dataCreated.getSeconds().toString();
 
  dataCompletaRecuperada = diaCadastro +"/"+mesCadastro+"/"+anoCadastro+ " - " + horaCadastro+":"+minutoCadastro+":"+segundoCadastro
  clienteRecebido.created =  dataCompletaRecuperada;
  clienteRecebido.quantidadeEmpresaCadastradas = 0;
  this.clienteCadastroCompleto.created = dataCompletaRecuperada
  this.clienteCadastroCompleto.quantidadeEmpresaCadastradas = 0

  console.log("Cliente completo: ", this.clienteCadastroCompleto);

  this.clienteservice.cadastrarCliente({...this.clienteCadastroCompleto}).then(()=>{
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Conta de Saída salva com sucesso',
      showConfirmButton: false,
      timer: 1000, 
      confirmButtonText:'Ok'
    })
    this.formCadastrarCliente.reset();
    this.clienteCadastroCompleto = new Cliente();
  })


  console.log("Cliente Cadastrado: ", clienteRecebido)
  console.log("Mes: ", mesCadastro)
  console.log("Dia: ", diaCadastro)
  console.log("Ano: ", anoCadastro)
  console.log("Hora: ", horaCadastro)
  console.log("Minutos: ", minutoCadastro)
  console.log("Segundos: ", segundoCadastro)
  console.log("Data completa: ", dataCompletaRecuperada)
  
}
numeroWhatsapp(){
  this.verificaCelularWhats = !this.verificaCelularWhats;
  if(this.verificaCelularWhats == true){
  this.clienteCadastroCompleto.whatsapp = this.clienteCadastroCompleto.celular;
  console.log("Valor do whats é: ", this.clienteCadastroCompleto.whatsapp);
  }
  
  }
}
