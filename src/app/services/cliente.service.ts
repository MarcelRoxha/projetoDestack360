import { Injectable } from '@angular/core';
import { Cliente } from '../models/clienteModel';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = 'http://localhost:8080/cadastrarCliente';

  constructor(
    private http : HttpClient
  ) { }

  cadastrarCliente(cliente : Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.apiURL, cliente);

  }

  listarClientes() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>('http://localhost:8080/recuperarClientes');

  }

}
