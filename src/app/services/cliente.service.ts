import { Cliente } from './../models/clienteModel';
import { ContaEntrada } from './../models/contaEntradaModel';
import { EmpresaModel } from './../models/empresaModel';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel';
import { ContaEntradaCaixa } from '../model/conta-entrada-caixa';
import { RecuperarInformacoesCixaEmpresaCliente } from '../model/recuperarInformacoesCaixaEmpresaCliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = 'https://dea9-2804-14c-a1-b6e9-db4-2df1-5c7b-9fb0.ngrok.io/cadastrarCliente';

  constructor(
    private http : HttpClient,
    private firebase: AngularFirestore
  ) { }

  cadastrarCliente(cliente : Cliente){
    return this.firebase.collection("CLIENTES-CADASTRADOS").doc(cliente.cpf).set(cliente);
     
  }

  recuperarInformacoesCliente(identificardo: string) : Observable<Cliente>{
    return this.http.post<Cliente>('https://destack360.herokuapp.com/api/recuperarInformacoesCliente', identificardo)
  }

  recuperarEmpresaCadastradasCliente(identificardo: string) : Observable<EmpresaModel[]>{
    return this.http.post<EmpresaModel[]>('https://destack360.herokuapp.com/api/recuperar-empresa-cliente', identificardo)
  }

  listarClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('https://destack360.herokuapp.com/api/listaClientes');

  }

  recuperarEmpresasCliente(identificardo: string): Observable<EmpresaModel[]>{
    return this.http.post<EmpresaModel[]>('https://destack360.herokuapp.com/api/recuperar-empresas-cliente', identificardo)
  }

  listaEmpresasCliente() : Observable<EmpresaModel[]>{
    return this.http.get<EmpresaModel[]>('https://destack360.herokuapp.com/api/recuperar-empresas-clientes-admin');

  }

  recuperarContaCaixaEmpresaCliente(informacoesClienteEmpresa: RecuperarInformacoesCixaEmpresaCliente) : Observable<ContaEntradaCaixa>{
    return this.http.post<ContaEntradaCaixa>('https://destack360.herokuapp.com/api/recuperar-conta-caixa-empresa', informacoesClienteEmpresa);

  }


}
