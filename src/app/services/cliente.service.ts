import { Injectable } from '@angular/core';
import { Cliente } from '../models/clienteModel';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = 'https://dea9-2804-14c-a1-b6e9-db4-2df1-5c7b-9fb0.ngrok.io/cadastrarCliente';

  constructor(
    private http : HttpClient
  ) { }

  cadastrarCliente(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.apiURL, cliente);

  }

  recuperarInformacoesCliente(identificardo: string) : Observable<Cliente>{
    return this.http.post<Cliente>('https://dea9-2804-14c-a1-b6e9-db4-2df1-5c7b-9fb0.ngrok.io/recuperarInformacoesCliente', identificardo)
  }

  listarClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('https://dea9-2804-14c-a1-b6e9-db4-2df1-5c7b-9fb0.ngrok.io/recuperarClientes');

  }

}
