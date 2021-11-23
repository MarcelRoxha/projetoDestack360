import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContaEntradaService } from './../services/conta-entrada.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { Cliente } from '../models/clienteModel';
import { ClienteService } from '../services/cliente.service';
import { ContaEntrada } from '../models/contaEntradaModel';

@Component({
  selector: 'app-lista-contas-entrada',
  templateUrl: './lista-contas-entrada.component.html',
  styleUrls: ['./lista-contas-entrada.component.css'],
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
export class ListaContasEntradaComponent implements OnInit {

  constasEntradaModels : ContaEntrada[] = [];
  user: Observable<any>; 
  isOpen = false; 
  isDisabled = false;
  clickCliente = false; 


  //---------INFORMAÇÕES RECUPERADAS PARA EXIBIR REFERENTE A CONTA DE ENTRADA----------//

  descricaoInfo: string;
  codigoC: string;
  codigoD: string;


  //---------RECUPERAR INFORMAÇÕES DA CONTA ENTRADA PARA EDITAR------//

  contaEntradaAtualiza: ContaEntrada;
  contaEdit: ContaEntrada = new ContaEntrada();
  contaInfor: any = new ContaEntrada();


  //-------FORMGROUP------------//
  formAtualizaContaEntrada: FormGroup;

  constructor(private contaEntradaService: ContaEntradaService, private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
    this.router.navigate(['/listarContasEntrada']);
  }

  ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
          if (user) {
              let emailLower = user.email.toLowerCase();
              this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
                   // get the user's doc in Cloud Firestore
          }
      });

      this.contaEntradaService.listaContasEntradaSalvas().subscribe(clientesCadastradosBanco =>{
        console.log("Contas Cadastradas Banco: ", clientesCadastradosBanco )
        this.constasEntradaModels = clientesCadastradosBanco;
      })
      this.formAtualizaContaEntrada = new FormGroup({
        codigoC: new FormControl('', Validators.required),
        codigoD: new FormControl('', Validators.required),
        descricao: new FormControl('', Validators.required),     
      })

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

salvarAlteracoesContaEntrada(identificadorContaEntrada: string){

  this.contaEntradaAtualiza = new ContaEntrada();
  console.log("Antes de atualizar: ", identificadorContaEntrada);
  this.contaEntradaAtualiza.identificador = this.contaEdit.codigoC;
  this.contaEntradaAtualiza.descricao = this.contaEdit.descricao;
  this.contaEntradaAtualiza.codigoC = this.contaEdit.codigoC;
  this.contaEntradaAtualiza.codigoD = this.contaEdit.codigoD;

  console.log("depois de atualizar: ", {...this.contaEntradaAtualiza});
  console.log("Recuperado salvar Alterações:", identificadorContaEntrada);
  console.log("Recuperado conta entrada:", this.contaEdit.codigoC);
  console.log("Recuperado Form:", {...this.formAtualizaContaEntrada.value});

}

recuperarInformacoesContaEntrada(identificadorContaEntrada: string){
 
  console.log("Id recuperado ao clicar: ", identificadorContaEntrada)
this.contaEntradaService.recuperarInformacoesContaEntrada(identificadorContaEntrada).subscribe(resultConta=>{
  this.descricaoInfo = resultConta.descricao;
  this.codigoC = resultConta.codigoC;
  this.codigoD = resultConta.codigoD;

});

  
}


}
