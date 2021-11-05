import { Injectable } from '@angular/core';
import { Cliente } from '../models/clienteModel';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = 'http://3672-104-198-233-245.ngrok.io/cadastrarCliente';

  constructor(
    private http : HttpClient
  ) { }

  cadastrarCliente(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.apiURL, cliente);

  }

  recuperarInformacoesCliente(identificardo: string) : Observable<Cliente>{
    return this.http.post<Cliente>('http://3672-104-198-233-245.ngrok.io/recuperarInformacoesCliente', identificardo)
  }

  listarClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://3672-104-198-233-245.ngrok.io/recuperarClientes');

  }

}
