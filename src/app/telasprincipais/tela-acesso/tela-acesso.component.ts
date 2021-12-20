import { Usuario } from './../../model/usuario';
import { Component, OnInit } from '@angular/core';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tela-acesso',
  templateUrl: './tela-acesso.component.html',
  styleUrls: ['./tela-acesso.component.css'],
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
export class TelaAcessoComponent implements OnInit {

  //CONFIGURAÇÕES INICIAS PADRÃO DA TELA
  user: Observable<any>; 
  isOpen = false; 


  //CLASSES
  usuarioCadastro: Usuario;
  usuarioAtualiza: Usuario;
  usuarioDeleta: Usuario;
  usuarioBanco : Usuario [] = []; 


  //MENSAGEM RETORNO USUARIO
  mensagemCasoNaoTenhaUsuarioCadastro = '';


  //VARIAVEIS DE DECISAO BOOLEAN
  verificaUsuariosCadastrados: boolean = false;
  selecionadoAdmin: boolean = false;
  selecionadoGerencia: boolean = false;
  selecionadoSupervisor: boolean = false;

  selecionadoAdminAtualizar: boolean = false;
  selecionadoGerenciaAtualizar: boolean = false;
  selecionadoSupervisorAtualizar: boolean = false;


  constructor(private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private router : Router,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
      if (user) {
          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
               // get the user's doc in Cloud Firestore
      }
  });

  this.iniciarVariaveis();
  this.recuperarListaClientesCadastras();


 
  }

  logout(): void {
    this.afAuth.signOut();
}
toggle(){
  this.isOpen = !this.isOpen;
  }

 //---------------------------------------------CADASTRAR USUARIO-------------------------------------------------//
  cadastrarCliente(usuarioFormulario: Usuario){
 

  if(usuarioFormulario.nome !== "" || usuarioFormulario.email !== "" || usuarioFormulario.nivelAcesso !== ""){
    console.log("Resultado formulario cadastro usuario", {...this.usuarioCadastro})

    this.usuarioService.cadastrarUsuarioService({...this.usuarioCadastro}).subscribe(resultadoCadstroUsuario=>{
      if(resultadoCadstroUsuario == 1){
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Ops! Não foi possível concluir o cadastro, e-mail informado já cadastrado',
          showConfirmButton: true,
          
        })
        usuarioFormulario.email = "";

      }else if(resultadoCadstroUsuario == 33){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Sucesso ao cadastrar usuario',
          showConfirmButton: true,          
        })
      }
    })  

    this.usuarioCadastro = new Usuario();
    this.recuperarListaClientesCadastras();
  }else{
    Swal.fire({
      position: 'top',
      icon: 'info',
      title: 'Favor verifique as informações e tente novamente',
      showConfirmButton: true,          
    })
    console.log("Ainda falta informações favor verifique o que foi digitado")
  }
    

  }

   //---------------------------------------------ATUALIZAR USUARIO-------------------------------------------------//

  atualizarCliente(usuarioRecuperadoAtualiza: Usuario){
    this.usuarioService.atualizarUsuarioService(usuarioRecuperadoAtualiza)
    .subscribe( resultadoAtualizacao=>{

      if(resultadoAtualizacao == 33){
       
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Sucesso ao atualizar usuario',
          showConfirmButton: true,          
        })
        this.usuarioAtualiza= new Usuario();
        this.recuperarListaClientesCadastras()
      }else{
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Erro ao atualizar usuario, verifique a conexão e tente novamente',
          showConfirmButton: true,          
        })
      }
    })

    console.log("usuario Atualizado Recuperado: ", usuarioRecuperadoAtualiza)
  }

   //---------------------------------------------DELETAR USUARIO-------------------------------------------------//

  deletarUsuario(usuarioDelete: Usuario){
    this.usuarioService.deletarUsuarioService(usuarioDelete).then(()=>{
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Sucesso ao deletar usuario',
        showConfirmButton: true,          
      })
      this.usuarioDeleta= new Usuario();
      this.recuperarListaClientesCadastras()
    })

  }

//---------------------------------------------VINCULAR EMPRESA USUARIO-------------------------------------------------//


  vincularEmpresa(){

  }

   //---------------------------------------------RECUPERAR LISTA DE USUARIOS CADASTRADOS-------------------------------------------------//


  recuperarListaClientesCadastras(){
this.usuarioService.recuperarUsuariosService().subscribe(resultadoLista=>{
  if(resultadoLista){
    console.log("Resultado lista Usuario, ", resultadoLista)
    this.usuarioBanco = resultadoLista;
    console.log("Resultado usuario Banco: ", this.usuarioBanco)
   
    if(this.usuarioBanco.length < 1){
      this.verificaUsuariosCadastrados = true;
      this.mensagemCasoNaoTenhaUsuarioCadastro = 'NÃO POSSUI USUÁRIOS CADASTRADOS'
        }else{
          this.mensagemCasoNaoTenhaUsuarioCadastro = '';
          this.verificaUsuariosCadastrados = false;
        }
    
  }else{
    this.usuarioBanco = [];
  }
})

  }



  //---------------------------------------------INICIAR VARIAVEIS-------------------------------------------------//

  iniciarVariaveis(){

    this.usuarioCadastro = new Usuario();
    this.usuarioAtualiza= new Usuario();
    this.usuarioDeleta= new Usuario();
    this.usuarioBanco =[] ; 

  }

  admin(){
 
    this.usuarioCadastro.nivelAcesso = "ADMIN"
  }
  gerencia(){
 
    this.usuarioCadastro.nivelAcesso = "GERENCIA"
  }
  supervisor(){
    this.usuarioCadastro.nivelAcesso = "SUPERVISOR"

  }


    //---------------------------------------------RECUPERAR INFORMAÇÕES ATUALIZAR USUARIO-------------------------------------------------//


    abrirModalAtualizarUsuario(usuarioRecuperadoAtualiza: Usuario){
      if(usuarioRecuperadoAtualiza.nivelAcesso == "ADMIN"){
        this.selecionadoAdminAtualizar = true;
        
      }else if(usuarioRecuperadoAtualiza.nivelAcesso == "GERENCIA"){
        this.selecionadoGerenciaAtualizar = true;
        
      }else if(usuarioRecuperadoAtualiza.nivelAcesso == "SUPERVISOR"){
        this.selecionadoSupervisorAtualizar = true;
      }      

      console.log("Usuario recuperado: ", usuarioRecuperadoAtualiza)
      this.usuarioAtualiza = usuarioRecuperadoAtualiza;
    }

    adminAtualiza(){
 
      this.usuarioAtualiza.nivelAcesso = "ADMIN"
    }
    gerenciaAtualiza(){
   
      this.usuarioAtualiza.nivelAcesso = "GERENCIA"
    }
    supervisorAtualiza(){
      this.usuarioAtualiza.nivelAcesso = "SUPERVISOR"
  
    }

    cancelarAtualizacao(){
      this.usuarioAtualiza = new Usuario();
    }

    //---------------------------------------------RECUPERAR INFORMAÇÕES DELETAR USUARIO-------------------------------------------------//


    abrirModalDeletarUsuario(usuarioDeletarRecebido: Usuario){

      if(usuarioDeletarRecebido.nivelAcesso == "ADMIN"){
        this.selecionadoAdminAtualizar = true;
        
      }else if(usuarioDeletarRecebido.nivelAcesso == "GERENCIA"){
        this.selecionadoGerenciaAtualizar = true;
        
      }else if(usuarioDeletarRecebido.nivelAcesso == "SUPERVISOR"){
        this.selecionadoSupervisorAtualizar = true;
      }      

      console.log("Usuario recuperado: ", usuarioDeletarRecebido)
      this.usuarioDeleta = usuarioDeletarRecebido;

    }
    cancelarDelete(){
      this.usuarioDeleta = new Usuario();
    }
}
