import { LancamentoSaida } from './../models/LancamentoSaidaModel';
import { ContaSaida } from './../models/contaSaidaModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LancamentoEntrada } from '../models/lancamentoEntradaModel';
import { ContaEntradaSalvaFutura } from '../models/lancamentoEntradaSalvoFuturo';
import { ContaSaidaSalvaFutura } from '../models/ContaSaidaSalvaFutura';

@Injectable({
  providedIn: 'root'
})
export class ContaSaidaService {

  private _refreshNeeded$ = new Subject<void>();
  apiURL: string = 'http://localhost:8080/cadastrarContaSaida';
  constructor(
    private http : HttpClient
  ) { }

  get refreshNeede$(){
    return this._refreshNeeded$;
  }

  cadastrarContaSaida(contaSaida : ContaSaida) : Observable<ContaSaida>{
    return this.http.post<ContaSaida>(this.apiURL, contaSaida);

  }

  listaContasSaidaSalvas():Observable<ContaSaida[]>{
    return this.http.get<ContaSaida[]>('https://destack360.herokuapp.com/api/recuperarContasSaida');

  }

  lancaSaida(lancarSaida : LancamentoSaida){
    return this.http.post<LancamentoEntrada>('https://destack360.herokuapp.com/api/lancarSaida', lancarSaida).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }

  salvarContaParaLancamentosFuturos(contaSalvaParaLancamentosFuturos : ContaSaidaSalvaFutura){
    return this.http.post<ContaSaidaSalvaFutura>('https://destack360.herokuapp.com/api/salvarSugestao', contaSalvaParaLancamentosFuturos);
  }
}
