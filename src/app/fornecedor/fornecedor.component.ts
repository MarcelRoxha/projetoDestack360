import { ContaSaida } from './../model/conta-saida';
import { FornecedorService } from './../service/fornecedor.service';
import { Fornecedor } from './../model/fornecedor';
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
import { HttpClient } from '@angular/common/http';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';


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



  //---------------MENSAGENS DE ERROS---------------------//
  msgErrorCEP: string = "";
  msgErrornomeFornecedor: string = "";
  msgErrorcnpj: string  = "";
	msgErrorendereco :string  = "";
	msgErroremail :string  = "";
	msgErrorcep : string  = "";
	msgErrornumero :string  = "";
	msgErrorcidade: string = "";
	msgErrorbairro: string = "";
	msgErrorestado: string = "";
	msgErrorcomplemento :string = "";
	msgErrortelefone: string = "";
	msgErrorcelular: string = "";
  msgErrorwhatsapp: string = "";





  //-------------VARIAVEIS DE DECISÃO---------------//

  verificaCelularWhats: boolean = false;
 
  verificamsgErrorCEP: boolean = false;
  verificamsgErrornomeFornecedor: boolean = false;
  verificamsgErrorcnpj: boolean = false;
	verificamsgErrorendereco : boolean = false;
	verificamsgErroremail : boolean = false;
	verificamsgErrorcep : boolean = false;
	veriricamsgErrornumero : boolean = false;
	verificamsgErrorcidade: boolean = false;
	verificamsgErrorbairro: boolean = false;
	verificamsgErrorestado: boolean = false;
	verificamsgErrorcomplemento : boolean = false;
	verificamsgErrortelefone: boolean = false;
	verificamsgErrorcelular: boolean = false;
  verificamsgErrorwhatsapp: boolean = false;

  verificaModal: boolean = false;

  
  validadorMsgUsuario: boolean;
 //-------------------CADASTRO FORNECEDOR-----------------------//
 forncedorModel: Fornecedor;
 fornecedorInformacoes: Fornecedor; 



//-------------------CONTA SAIDA CADASTRO FORNECEDOR-----------------------//
  contaSaidaCadastradaFornecedor: ContaSaida [];
  listaContasAdicionadas: ContaSaida [] = [];
  contaSaidaCadastradaFornecedorCompleta: ContaSaida;
  historicoCompleto: string;
  descricao: string;
  codigoContaFornecedor: string;
  nomeFornecedorHistorico: string;


  //------------------COMPONENTES DE TELA----------------------//

  trocaBotao: boolean = false; 



  constructor(private cf: ChangeDetectorRef, public userModelService: UserModelService,  
    public afAuth: AngularFireAuth, 
    private firestore: AngularFirestore, 
    private router : Router,
    private _httpClient: HttpClient, 
    private modal: NgbModal,
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
    this.forncedorModel= new Fornecedor();
    this.forncedorModel.nomeFornecedor = '';
   }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);
     this.contaSaidaCadastradaFornecedor = [];
     this.fornecedorInformacoes = new Fornecedor ();
     this.contaSaidaCadastradaFornecedorCompleta = new ContaSaida();
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

  editarLinhaContaCadastradaFornecedor(indice: number, contaRecebida: ContaSaida ){
    this.trocaBotao = true;
  }

  salvarAlteracoesFeitasContaCadastradaFornecedor(){
    this.trocaBotao = false;
  }


  adicionarLinhaCadastrarContaFornecedor(nomeFornecedor: string){ 
 

    const contaCadastrada = new ContaSaida();
   
    contaCadastrada.identificadorFornecedor = this.forncedorModel.cnpj;
    contaCadastrada.codigoConta = this.codigoContaFornecedor;    
    contaCadastrada.historico = nomeFornecedor  + " : " + this.descricao;  
    
    
    this.contaSaidaCadastradaFornecedor.push(contaCadastrada)
    console.log("Entrou no adicionar linha dados recuperados: " , this.contaSaidaCadastradaFornecedorCompleta)
    this.contaSaidaCadastradaFornecedorCompleta = new ContaSaida();
    this.codigoContaFornecedor = "";
    this.descricao = "";    
    this.contaSaidaCadastradaFornecedor.splice;
  }

  cadastarFornecedor(forncedorModelRecebido: Fornecedor){

    if(forncedorModelRecebido.nomeFornecedor !== '' && forncedorModelRecebido.cnpj !== '' &&
     forncedorModelRecebido.celular !== '' && forncedorModelRecebido.whatsapp !== '' &&
     forncedorModelRecebido.cep){
      this.fornecedorInformacoes = forncedorModelRecebido;
      this.verificaModal = !this.verificaModal;

      this.fornecedorService.cadastrar({...this.forncedorModel});

      Swal.fire({
        icon: 'success',
        title: 'CADASTRO EFETUADO',
        text: 'Cadastro efetuado com sucesso!',
        showConfirmButton: false,
        timer: 1000
      })
      this.forncedorModel = new Fornecedor();
    }else{
      Swal.fire({
        icon: 'info',
        title: 'Faltando informação',
        text: 'Favor verifique as informações inseridas e se o problema persistir contate o administrador'       
      })

    }
  }


  consultarCEP($event: any){
    
    this.forncedorModel.cep = this.forncedorModel.cep.replace(/\D/g, '');

    if (this.forncedorModel.cep != "") {
      var validacep = /^[0-9]{8}$/;

       //Valida o formato do CEP.
       if(validacep.test(this.forncedorModel.cep)) {
        this._httpClient.get(`https://viacep.com.br/ws/${this.forncedorModel.cep}/json/`).subscribe(resultadoCep=>{
          let fornecedor : any = new Fornecedor()
          fornecedor = resultadoCep;
        this.popularDadosEndereco(fornecedor)
        this.msgErrorCEP = "";
        })
       }else{       
         console.log("CEP invalido")

       }

    }else{

      if(this.forncedorModel.cep = ""){
        this.msgErrorCEP = "Esse campo é obrigatório no cadastro de empresa"        
      }
      console.log("Cep vazio")
    }


   
    
  
 
 
  }

  popularDadosEndereco(empresa: any){
    
    this.forncedorModel.endereco = empresa.logradouro;
    this.forncedorModel.bairro = empresa.bairro;
    this.forncedorModel.complemento = empresa.complemento;
    this.forncedorModel.estado = empresa.uf;
    this.forncedorModel.cidade = empresa.localidade;
    
    console.log("Resultado: ", empresa)

  }


  /**
   * 
  
  cadastrarFornecedor(){



    console.log("Clicado Cadastrar fornecedor");
    console.log("informações formControl: ", this.formCadastrarFornecedor.value);
    console.log("informações forncedor: ", this.forncedorModel);    
   

    if(this.formCadastrarFornecedor.invalid){
    //  this.fornecedorService.cadastrar({...this.forncedorModel})
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
   * 
   */
cadastrarFornecedor(fornecedorConfirmado: Fornecedor){

}
  numeroWhatsapp(){
    this.verificaCelularWhats = !this.verificaCelularWhats;
    if(this.verificaCelularWhats == true){
    this.forncedorModel.whatsapp = this.forncedorModel.celular;
    console.log("Valor do whats é: ", this.forncedorModel.whatsapp);
    }
    
    }

}
function index(index: any, arg1: number) {
  throw new Error('Function not implemented.');
}

