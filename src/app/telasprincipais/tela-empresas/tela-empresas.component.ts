import { HttpClient } from '@angular/common/http';
import { EmpresaService } from './../../service/empresa.service';
import { Empresa } from './../../model/empresa';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { Usuario } from 'src/app/model/usuario';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tela-empresas',
  templateUrl: './tela-empresas.component.html',
  styleUrls: ['./tela-empresas.component.css'],
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
export class TelaEmpresasComponent implements OnInit {

   //CONFIGURAÇÕES INICIAS PADRÃO DA TELA
 user: Observable<any>; 
 isOpen = false; 

 //CLASSES

 empresaCadastra: Empresa = new Empresa();
 empresaAtualiza: Empresa = new Empresa();
 empresaDeleta: Empresa = new Empresa();
 empresasBanco : Empresa [] = [];

 //MENSAGEM RETORNO LISTA EMPRESA CADASTRADA

 mensagemCasoNaoTenhaEmpresaCadastrada = '';


 //VARIAVEIS DE DECISAO BOOLEAN

 verificaEmpresasCadastradas : boolean = false;
 verificaCelularWhats: boolean = false;
 chackDesabilteBox: boolean = false;


 constructor(private afAuth: AngularFireAuth, 
   private firestore: AngularFirestore,
   private router : Router,
   private empresaService: EmpresaService,
   private _httpClient: HttpClient) { }

 ngOnInit(): void {
   this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
     if (user) {
         let emailLower = user.email.toLowerCase();
         this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
              // get the user's doc in Cloud Firestore
     }
 });
 this.recuperarListaEmpresasCadastradas()
 }

 logout(): void {
   this.afAuth.signOut();
}
toggle(){
 this.isOpen = !this.isOpen;
 }


 cadastrarEmpresa(empresaRecebida: Empresa){
   this.empresaService.cadastrarEmpresa(empresaRecebida).subscribe(resultadoCadastroEmpresa=>{

    if(resultadoCadastroEmpresa == 1){
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Ops! Não foi possível concluir o cadastro, empresa já cadastrada',
        showConfirmButton: true,
        
      })   

    }else if(resultadoCadastroEmpresa == 33){
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Sucesso ao cadastrar empresa',
        showConfirmButton: true,          
      })
      this.empresaCadastra = new Empresa()
      this.recuperarListaEmpresasCadastradas();
      this.chackDesabilteBox = false;
    }else if(resultadoCadastroEmpresa == 45){
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'ATENÇÃO PARA CADASTRAR UMA EMPRESA É NECESSÁRIO AO MENOS INFORMAR O CNPJ DA EMPRESA, TENTE NOVAMENTE!',
        showConfirmButton: true,          
      })

    }
  })  


 }


 recuperarListaEmpresasCadastradas(){
  this.empresaService.recuperarEmpresaService().subscribe(resultadoLista=>{
    if(resultadoLista){
      console.log("Resultado lista Empresa, ", resultadoLista)
      this.empresasBanco = resultadoLista;
      console.log("Resultado usuario Banco: ", this.empresasBanco)
     
      if(this.empresasBanco.length < 1){
        this.verificaEmpresasCadastradas = true;
        this.mensagemCasoNaoTenhaEmpresaCadastrada = 'NÃO POSSUI EMPRESAS CADASTRADAS'
          }else{
            this.mensagemCasoNaoTenhaEmpresaCadastrada = '';
            this.verificaEmpresasCadastradas = false;
          }
      
    }else{
      this.empresasBanco = [];
    }
  })
  
    }

    verificaWhatsCelular(){
      this.verificaCelularWhats = this.verificaCelularWhats;
    }
    numeroWhatsapp(){
      this.verificaCelularWhats = !this.verificaCelularWhats;
      if(this.verificaCelularWhats == true){
      this.empresaCadastra.whatsapp = this.empresaCadastra.celular;
      console.log("Valor do whats é: ", this.empresaCadastra.whatsapp);
      }
      
      }
    cancelarCadastroEmpresa(){
      this.empresaCadastra = new Empresa();
    }

    consultarCEP($event: any){
    
      this.empresaCadastra.cep = this.empresaCadastra.cep.replace(/\D/g, '');
  
      if (this.empresaCadastra.cep != "") {
        var validacep = /^[0-9]{8}$/;
  
         //Valida o formato do CEP.
         if(validacep.test(this.empresaCadastra.cep)) {
          this._httpClient.get(`https://viacep.com.br/ws/${this.empresaCadastra.cep}/json/`).subscribe(resultadoCep=>{
            let empresa : any = new Empresa();
            empresa = resultadoCep;
          this.popularDadosEndereco(empresa)
          })
         }else{
         
           console.log("CEP invalido")
  
         }
        } 
    
    
   
   
    }
    popularDadosEndereco(empresa: any){
    
      this.empresaCadastra.endereco = empresa.logradouro;
      this.empresaCadastra.bairro = empresa.bairro;
      this.empresaCadastra.complemento = empresa.complemento;
      this.empresaCadastra.estado = empresa.uf;
      this.empresaCadastra.cidade = empresa.localidade;
      
      console.log("Resultado: ", empresa)
  
    }
}
