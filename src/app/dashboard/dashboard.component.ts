import { ContaEntradaService } from './../services/conta-entrada.service';
import { UserModel } from './../models/UserModel';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserModelService } from '../services/user-model.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent implements OnInit {

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

  msgRetorno: string ="";
  
  //Dados Usuarios Firebase
  userModelRecuperado: UserModel  = new UserModel();
  userModelRecuperadoFevereiro: UserModel  = new UserModel();
  userModelRecuperadoMarco: UserModel  = new UserModel();
  userModelRecuperadoAbril: UserModel  = new UserModel();
  userModelRecuperadoMaio: UserModel  = new UserModel();
  userModelRecuperadoJunho: UserModel  = new UserModel();
  userModelRecuperadoJulho: UserModel  = new UserModel();
  userModelRecuperadoAgosto: UserModel  = new UserModel();
  userModelRecuperadoSetembro: UserModel  = new UserModel();
  userModelRecuperadoOutubro: UserModel  = new UserModel();
  userModelRecuperadoNovembro: UserModel  = new UserModel();
  userModelRecuperadoDezembro: UserModel  = new UserModel();
  
  dadosUsuarioRecuperado: Observable<any>;
  suscription: Subscription; 
  

  //Grafico
  canvas: any;
  ctx: any;
  @ViewChild('myChart') myChart: any;


      // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

    constructor(private contaEntradaService: ContaEntradaService, private cf: ChangeDetectorRef, public userModelService: UserModelService,  public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
      this.router.navigate(['/dashboard']); 

      
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
          this.recuperarInformacoesJaneiro();
          this.recuperarInformacoesFevereiro();
          this.recuperarInformacoesMarco();
          this.recuperarInformacoesAbril();
          this.recuperarInformacoesMaio();
          this.recuperarInformacoesJunho();
          this.recuperarInformacoesJulho();
          this.recuperarInformacoesAgosto();
          this.recuperarInformacoesSetembro();
          this.recuperarInformacoesOutubro();
          this.recuperarInformacoesNovembro();
          this.recuperarInformacoesDezembro();
         


          this.contaEntradaService.refreshNeede$.subscribe(()=>{
          this.recuperarInformacoesJaneiro();
          this.recuperarInformacoesFevereiro();
          this.recuperarInformacoesMarco();
          this.recuperarInformacoesAbril();
          this.recuperarInformacoesMaio();
          this.recuperarInformacoesJunho();
          this.recuperarInformacoesJulho();
          this.recuperarInformacoesAgosto();
          this.recuperarInformacoesSetembro();
          this.recuperarInformacoesOutubro();
          this.recuperarInformacoesNovembro();
          this.recuperarInformacoesDezembro();
           
          });              
        })             
      }
  });

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
          this.recuperarInformacoesJaneiro();
          this.recuperarInformacoesFevereiro();
          this.recuperarInformacoesMarco();
          this.recuperarInformacoesAbril();
          this.recuperarInformacoesMaio();
          this.recuperarInformacoesJunho();
          this.recuperarInformacoesJulho();
          this.recuperarInformacoesAgosto();
          this.recuperarInformacoesSetembro();
          this.recuperarInformacoesOutubro();
          this.recuperarInformacoesNovembro();
          this.recuperarInformacoesDezembro();
         


          this.contaEntradaService.refreshNeede$.subscribe(()=>{
          this.recuperarInformacoesJaneiro();
          this.recuperarInformacoesFevereiro();
          this.recuperarInformacoesMarco();
          this.recuperarInformacoesAbril();
          this.recuperarInformacoesMaio();
          this.recuperarInformacoesJunho();
          this.recuperarInformacoesJulho();
          this.recuperarInformacoesAgosto();
          this.recuperarInformacoesSetembro();
          this.recuperarInformacoesOutubro();
          this.recuperarInformacoesNovembro();
          this.recuperarInformacoesDezembro();
           
          });              
        })             
      }
  });
      
    }

    logout(): void {
      this.afAuth.signOut();
  }

  toggle(){
    this.isOpen = !this.isOpen;
    }

    efetuarLancamentoSaida(){  
      this.router.navigate(['/lancarSaida'])
     
      
    }

    efetuarLancamentoEntrada(){
     this.router.navigate(['/lancarEntrada'])
     
    }
   

    retornarData(){
      console.log(this.lancerForm.value) 
    }

    testando(){
      console.log("clique");
    }

    recuperarInformacoesJaneiro(): void{
      
      this.userModelService.informacoesJaneiro({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperado.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperado.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperado.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperado.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperado})}
      })

    }

    recuperarInformacoesFevereiro(): void{
      this.userModelService.informacoesFevereiro({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoFevereiro.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoFevereiro.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoFevereiro.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoFevereiro.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperadoFevereiro})}
      })

    }

    recuperarInformacoesMarco(){
      this.userModelService.informacoesMarco({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro === null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoMarco.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoMarco.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoMarco.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoMarco.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperadoMarco})}
      })

    }

    recuperarInformacoesAbril(){
      this.userModelService.informacoesAbril({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoAbril.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoAbril.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoAbril.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoAbril.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              if(this.userModelRecuperadoAbril === null){
                console.log("Resultado abril deu nulo");
              }

    console.log("Abril..", {...this.userModelRecuperadoAbril})}
      })

    }

    recuperarInformacoesMaio(): void{

      this.userModelService.informacoesMaio({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoMaio.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoMaio.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoMaio.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoMaio.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperado})}
      })

    }

    recuperarInformacoesJunho(): void{


     
      this.userModelService.informacoesJunho({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro === null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoJunho.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoJunho.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoJunho.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoJunho.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              
          if(this.userModelRecuperadoJunho === null){
            this.msgRetorno = "Item está nulo Julho";
            console.log("Item nulo");
          }
    console.log("Junho", {...this.userModelRecuperadoJunho})}
      })

      
    }

    recuperarInformacoesJulho(): void{
      this.userModelService.informacoesJulho({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoJulho.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoJulho.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoJulho.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoJulho.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperadoJulho})}
      })

    }

    recuperarInformacoesAgosto(): void{
      this.userModelService.informacoesAgosto({...this.userModel}).subscribe(informacoesJaneiro =>{
  
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
          this.userModelRecuperadoAgosto.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
          this.userModelRecuperadoAgosto.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
          this.userModelRecuperadoAgosto.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
          this.userModelRecuperadoAgosto.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
                
  
      console.log({...this.userModelRecuperadoAgosto})
        }
  
      })

    }

    recuperarInformacoesSetembro(): void{
      this.userModelService.informacoesSetembro({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{

        this.userModelRecuperadoSetembro.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoSetembro.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoSetembro.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoSetembro.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperadoSetembro})
        }
      })

    }

    recuperarInformacoesOutubro(): void{
      this.userModelService.informacoesOutubro({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoOutubro.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoOutubro.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoOutubro.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoOutubro.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperadoOutubro})}
      })

    }

    recuperarInformacoesNovembro(): void{
      this.userModelService.informacoesNovembro({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro == null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoNovembro.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoNovembro.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoNovembro.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoNovembro.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperadoNovembro})}
      })

    }

    recuperarInformacoesDezembro(): void{
      this.userModelService.informacoesDezembro({...this.userModel}).subscribe(informacoesJaneiro =>{
        if(informacoesJaneiro === null){
          console.log("Sem Lancamento");
        }else{
        this.userModelRecuperadoDezembro.valorTotalEntradaMensal = informacoesJaneiro.valorTotalEntradaMensal;
        this.userModelRecuperadoDezembro.valorTotalSaidaMensal = informacoesJaneiro.valorTotalSaidaMensal
        this.userModelRecuperadoDezembro.quantidadeTotalLancamentosEntradaMensal = informacoesJaneiro.quantidadeTotalLancamentosEntradaMensal
        this.userModelRecuperadoDezembro.quantidadeTotalLancamentosSaidaMensal = informacoesJaneiro.quantidadeTotalLancamentosSaidaMensal              
              

    console.log({...this.userModelRecuperadoDezembro})
  }
      })

    }
  
  
}
