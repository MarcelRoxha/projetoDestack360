import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

  animations:[
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '1250px',
        height: '520px',
        opacity: 1,
        padding: '33px',
        backgroundColor: 'white',
        transform: 'translateX(-200px)'
      })),
      state('closed', style({
        width: '1050px',
        height: '520px',       
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
export class SidenavComponent implements OnInit {
  
  verificaUserLogado = false;     
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

 
  constructor(private router : Router) {
   
  }

  ngOnInit(): void {
  }


  toggle(){
    this.isOpen = !this.isOpen;
    }

    efetuarLancamentoSaida(){  
      this.clickEfetuarLancamentoEntrada = !this.clickEfetuarLancamentoEntrada;        
     return this.clickEfetuarLancamentoSaida = !this.clickEfetuarLancamentoSaida;
           
    }

    efetuarLancamentoEntrada(){
      return this.router.navigate(['/lancar'])
     
    }

    retornarData(){
      console.log(this.lancerForm.value) 
    }

    acessarInicio(){
      return this.router.navigate(['/dashboard'])
    }
  

}
