import { ContaEntradaSalvaFutura } from './../models/lancamentoEntradaSalvoFuturo';
import { LancamentoEntrada } from './../models/lancamentoEntradaModel';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContaEntrada } from '../models/contaEntradaModel';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContaEntradaService {
 
  private _refreshNeeded$ = new Subject<void>();
  apiURL: string = 'https://8926-104-198-233-245.ngrok.io/cadastrarContaEntrada';
  constructor(
    private http : HttpClient
  ) { }

  get refreshNeede$(){
    return this._refreshNeeded$;
  }

  cadastrarContaEntrada(contaEntrada : ContaEntrada) : Observable<ContaEntrada>{
    return this.http.post<ContaEntrada>(this.apiURL, contaEntrada);

  }

  listaContasEntradaSalvas() : Observable<ContaEntrada[]>{
    return this.http.get<ContaEntrada[]>('https://8926-104-198-233-245.ngrok.io/recuperarContasEntrada');

  }

  lancarEntrada(lancamentoContaEtrada : LancamentoEntrada){
    return this.http.post<LancamentoEntrada>('https://8926-104-198-233-245.ngrok.io/lancarEntrada', lancamentoContaEtrada).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }

  salvarContaParaLancamentosFuturos(contaSalvaParaLancamentosFuturos : ContaEntradaSalvaFutura){
    return this.http.post<ContaEntradaSalvaFutura>('https://8926-104-198-233-245.ngrok.io/salvarSugestao', contaSalvaParaLancamentosFuturos);
  }
}
