import { Injectable } from '@angular/core';
import { Cliente } from '../models/clienteModel';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = 'https://destack360.herokuapp.com/cadastrarCliente';

  constructor(
    private http : HttpClient
  ) { }

  cadastrarCliente(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.apiURL, cliente);

  }

  recuperarInformacoesCliente(identificardo: string) : Observable<Cliente>{
    return this.http.post<Cliente>('https://destack360.herokuapp.com/recuperarInformacoesCliente', identificardo)
  }

  listarClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('https://destack360.herokuapp.com/recuperarClientes');

  }

}
