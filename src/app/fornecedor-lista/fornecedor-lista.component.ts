import { Observable } from 'rxjs';
import { FornecedorDataService } from './../service/fornecedor-data.service';
import { FornecedorService } from './../service/fornecedor.service';
import { FornecedorModel } from './../model/fornecedor-model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/UserModel';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UserModelService } from '../services/user-model.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FirestoreModule } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { ContaSaida } from '../models/contaSaidaModel';
import { ContaSaidaService } from '../services/conta-saida.service';

@Component({
  selector: 'app-fornecedor-lista',
  templateUrl: './fornecedor-lista.component.html',
  styleUrls: ['./fornecedor-lista.component.css'],
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
export class FornecedorListaComponent implements OnInit {

  fornecedor: Observable<any>;
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
  formCadastrarFornecedorUpdate: FormGroup;
  forncedorModel: FornecedorModel = new FornecedorModel();
  fornecedores: Observable<any>;
  fornecedorInformacoes: any = new FornecedorModel();
  formAtualizarFornecedor: FormGroup;


  //-------------CADASTRO DE SERVIÇO FORNECEDOR--------------//
  identificadorFornecedor: string;
  descricaoServico: string;
  codigoContaDebito: string;
  codigoContaCredito: string;
  nomeFornecedorCadastroServico: string;


  //-----------FORMULARIOS---------------//
  formCadastrarContaSaida: FormGroup;


  //-------------------------//

  fornecedorAtualiza: FornecedorModel = new FornecedorModel();
  contaBancariaAtualiza: string;
  cnpjAtualiza: string;
  contatoTelefonicoAtualiza: string;
  endereoAtualiza: string;
  formaPagamentoAtualiza: string;
  razaoSocialAtualiza: string;
  tipoServicoAtualiza: string;
  emailAtualiza: string;
  resultadoAtualizacao: boolean;
  msgRetornoAtualizacao: string = "";

  idSelecionadoExclusao: string;
  fornecedorSelecionadoExclusao : string;
  verificaFornecedores: boolean = false;
  contaSaida: ContaSaida;


  constructor(private fornecedorService: FornecedorService, 
    private firebase: AngularFirestore,
    public userModelService: UserModelService,  
    public afAuth: AngularFireAuth, 
    private firestore: AngularFirestore, 
    private router : Router,
    private consaSaidaService: ContaSaidaService, 
   ) {
     
   
      this.router.navigate(['/fornecedorlista']);
      this.formAtualizarFornecedor  = new FormGroup({
        newrazaoSocial: new FormControl('', Validators.required),
        newcnpj: new FormControl('', Validators.required),
        newendereco: new FormControl('', Validators.required),
        newcontaBancaria: new FormControl('', Validators.required),
        newformadePagamento: new FormControl('', Validators.required),
        newemail: new FormControl('', Validators.required),
        newcontatoTelefonico: new FormControl('', Validators.required),
        newtipoServico: new FormControl('', Validators.required),
      })

      this.formCadastrarContaSaida =  new FormGroup({
        codigoContaCredito: new FormControl('', Validators.required),
        codigoContaDebito: new FormControl('', Validators.required),
        descricaoServico: new FormControl('', Validators.required),        
      })


    }
  


  ngOnInit(): void {

   
    this.fornecedores = this.fornecedorService.recuperarFornecedoresCadastrados();

    if(this.fornecedores._isScalar !== false ){
      console.log("Tem Fornecedor")
    }else{
      this.verificaFornecedores = true;
      console.log("Não tem fornecedor")
    }
    console.log("O que está me retornando?: ", this.fornecedores)
    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);
     console.log("Fornecedores:",  this.fornecedores)
     
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

  cadastrarContaSaida(){
    console.log(this.formCadastrarContaSaida.value);
   
  
  if(this.formCadastrarContaSaida.invalid){
    Swal.fire('Só é possível salvar conta de saída, se todas as informações estiverem preenchidas, verifique as informações e tente novamente')
    console.log("Invalido")
  }else{
    const contaSaida : ContaSaida = {...this.formCadastrarContaSaida.value}
    
  
    if(contaSaida.codigoC !== "" || contaSaida.codigoD !== "" 
    || contaSaida.descricaoServico !== ""){

      contaSaida.fornecedor = this.nomeFornecedorCadastroServico;
      contaSaida.identificador = this.identificadorFornecedor;
      console.log("conta depois de receber identificador e fornecedor: ", contaSaida);
      this.firebase.collection('FORNECEDORES').doc(this.identificadorFornecedor).collection("SERVIÇOS").add({...this.formCadastrarContaSaida.value})

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Conta de Saída salva com sucesso',
        showConfirmButton: false,
        timer: 1000
      })
     
      this.formCadastrarContaSaida.reset();
    }else{
      
      Swal.fire('Erro desconhecido, favor contate o administrador')
      
    }
  
  
    
  }
  
  }


  cadastrarServicoFornecedor(){
    this.contaSaida = new ContaSaida();
    this.contaSaida.fornecedor = this.nomeFornecedorCadastroServico;
    this.contaSaida.descricaoServico = this.descricaoServico;
    this.contaSaida.codigoC = this.codigoContaCredito;
    this.contaSaida.codigoD = this.codigoContaDebito;
    this.contaSaida.identificador = this.identificadorFornecedor;

      console.log("Entrou no cadastrarServico Fornecedor: ", {...this.contaSaida})
      this.firebase.collection("FORNECEDORES")
      .doc(this.identificadorFornecedor)
      .collection(this.nomeFornecedorCadastroServico)
      .add({...this.contaSaida})
    

    

  }

  editar(fornecedor: FornecedorModel){
    console.log("Cliquei no editar Fornecedor: ", fornecedor )


   
    console.log("Form update:", {...this.formCadastrarFornecedorUpdate.value})

  }
  deletar(key: string){ 
    this.firebase.collection("FORNECEDORES").doc(key).delete();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Fornecedor deletado com sucesso',
      showConfirmButton: false,
      timer: 1000
    })


  }
  prepararExclusao(cnpj: string, razaoSocial: string){
  this.idSelecionadoExclusao = cnpj;
  this.fornecedorSelecionadoExclusao =razaoSocial;
  }

  carregarInformacoesFornecedor(id: string){
      this.firebase.collection("FORNECEDORES").doc(id).valueChanges().subscribe(resultado =>{
        this.fornecedorInformacoes = resultado;
        this.razaoSocialAtualiza = this.fornecedorInformacoes.razaoSocial;
        this.contaBancariaAtualiza = this.fornecedorInformacoes.contaBancaria;
        this.contatoTelefonicoAtualiza = this.fornecedorInformacoes.contatoTelefonico;
        this.endereoAtualiza = this.fornecedorInformacoes.endereco;
        this.cnpjAtualiza = this.fornecedorInformacoes.cnpj;
        this.emailAtualiza = this.fornecedorInformacoes.email;
        this.tipoServicoAtualiza = this.fornecedorInformacoes.tipoServico;
        this.formaPagamentoAtualiza = this.fornecedorInformacoes.formadePagamento;        
        console.log("RazaoSocial", this.fornecedorInformacoes.razaoSocial);
      })

  }
  atualizarFornecedor(){

    this.fornecedorInformacoes = new FornecedorModel();

    this.fornecedorAtualiza = new FornecedorModel();
    this.fornecedorAtualiza.razaoSocial = this.razaoSocialAtualiza;
    this.fornecedorAtualiza.contaBancaria = this.contaBancariaAtualiza;
    this.fornecedorAtualiza.contatoTelefonico = this.contatoTelefonicoAtualiza;
    this.fornecedorAtualiza.endereco = this.endereoAtualiza;
    this.fornecedorAtualiza.cnpj = this.cnpjAtualiza;
    this.fornecedorAtualiza.email = this.emailAtualiza;
    this.fornecedorAtualiza.tipoServico = this.tipoServicoAtualiza;
    this.fornecedorAtualiza.formadePagamento = this.formaPagamentoAtualiza;


    console.log("Informacoes antigas: ", this.fornecedorInformacoes);
    console.log("Informaçoes atuais: ", {...this.formAtualizarFornecedor.value});

   this.resultadoAtualizacao =  this.fornecedorService.atualizar({...this.fornecedorAtualiza}, this.fornecedorAtualiza.cnpj);
    if(this.resultadoAtualizacao !== false){
      this.msgRetornoAtualizacao = "SUCESSO AO ATUALIZAR INFORMAÇÕES"
      
    }else{

      this.msgRetornoAtualizacao = "ERRO AO ATUALIZAR INFORMAÇÕES"
    }
    
  }

  confirmarEntendido(){
    window.location.reload();
  }

  recuperarInformacoesFornecedorCadastroServico(idFornecedor: string, nomeEmpresa: string){

    
    this.identificadorFornecedor = idFornecedor;
    this.nomeFornecedorCadastroServico = nomeEmpresa

  }

}
