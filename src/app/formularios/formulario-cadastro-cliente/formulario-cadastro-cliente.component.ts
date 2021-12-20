import { Cliente } from './../../models/clienteModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-cadastro-cliente',
  templateUrl: './formulario-cadastro-cliente.component.html',
  styleUrls: ['./formulario-cadastro-cliente.component.css']
})
export class FormularioCadastroClienteComponent implements OnInit {
  
  sideBarOpen = true;
  clienteCadastroCompleto: Cliente;


  //VALIDAÇÕES VERADEIRO E FALSO

  //check-box:

  verificaCelularWhats : boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.clienteCadastroCompleto = new Cliente();
  }

  

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  consultarCEP($event: any){

  }

  cadastrarCliente(clienteRecebido: Cliente){

  }
  numeroWhatsapp(){
    
  }

}
