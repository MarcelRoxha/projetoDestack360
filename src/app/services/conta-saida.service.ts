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
  apiURL: string = 'https://8926-104-198-233-245.ngrok.io/cadastrarContaSaida';
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
    return this.http.get<ContaSaida[]>('https://8926-104-198-233-245.ngrok.io/recuperarContasSaida');

  }

  lancaSaida(lancarSaida : LancamentoSaida){
    return this.http.post<LancamentoEntrada>('https://8926-104-198-233-245.ngrok.io/lancarSaida', lancarSaida).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }

  salvarContaParaLancamentosFuturos(contaSalvaParaLancamentosFuturos : ContaSaidaSalvaFutura){
    return this.http.post<ContaSaidaSalvaFutura>('https://8926-104-198-233-245.ngrok.io/salvarSugestao', contaSalvaParaLancamentosFuturos);
  }
}
