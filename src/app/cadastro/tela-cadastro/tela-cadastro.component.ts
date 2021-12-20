import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/clienteModel';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrls: ['./tela-cadastro.component.css']
})
export class TelaCadastroComponent implements OnInit {

  acessarTelaFormulario: boolean = false;
  clienteCadastroCompleto: Cliente;
  verificaCelularWhats : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  acessarTelaFormularioTela(){
    console.log("Click acesso...")
    this.acessarTelaFormulario = !this.acessarTelaFormulario;
  }
  consultarCEP($event: any){

  }

  cadastrarCliente(clienteRecebido: Cliente){

  }
  numeroWhatsapp(){
    
  }
 

}
