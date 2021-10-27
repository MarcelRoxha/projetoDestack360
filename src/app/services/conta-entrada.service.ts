import { ContaEntradaSalvaFutura } from './../models/lancamentoEntradaSalvoFuturo';
import { LancamentoEntrada } from './../models/lancamentoEntradaModel';
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

  lancarEntrada(lancamentoContaEtrada : LancamentoEntrada){
    return this.http.post<LancamentoEntrada>('http://localhost:8080/lancarEntrada', lancamentoContaEtrada);
  }

  salvarContaParaLancamentosFuturos(contaSalvaParaLancamentosFuturos : ContaEntradaSalvaFutura){
    return this.http.post<ContaEntradaSalvaFutura>('http://localhost:8080/salvarSugestao', contaSalvaParaLancamentosFuturos);
  }
}
