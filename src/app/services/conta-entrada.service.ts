import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContaEntrada } from '../models/contaEntradaModel';

@Injectable({
  providedIn: 'root'
})
export class ContaEntradaService {

  apiURL: string = 'http://localhost:8080/cadastrarContaEntrada';
  constructor(
    private http : HttpClient
  ) { }

  cadastrarContaEntrada(contaEntrada : ContaEntrada) : Observable<ContaEntrada>{
    return this.http.post<ContaEntrada>(this.apiURL, contaEntrada);

  }

  listaContasEntradaSalvas() : Observable<ContaEntrada[]>{
    return this.http.get<ContaEntrada[]>('http://localhost:8080/recuperarContasEntrada');

  }
}
