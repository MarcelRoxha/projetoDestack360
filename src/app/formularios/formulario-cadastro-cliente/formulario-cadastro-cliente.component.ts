import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario-cadastro-cliente',
  templateUrl: './formulario-cadastro-cliente.component.html',
  styleUrls: ['./formulario-cadastro-cliente.component.css']
})
export class FormularioCadastroClienteComponent implements OnInit {
  
  sideBarOpen = true;
  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
