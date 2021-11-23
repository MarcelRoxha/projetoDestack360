import { ContaEntradaSalvaFutura } from './../models/lancamentoEntradaSalvoFuturo';
import { LancamentoEntrada } from './../models/lancamentoEntradaModel';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContaEntrada } from '../models/contaEntradaModel';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContaEntradaService {
 
  private _refreshNeeded$ = new Subject<void>();
  apiURL: string = 'http://localhost:8080/api/cadastrarContaEntrada';
  verificaIf : boolean ;
  constructor(
    private http : HttpClient,
    private db: AngularFirestore 
  ) { }

  get refreshNeede$(){
    return this._refreshNeeded$;
  }

  cadastrarContaEntrada(contaEntrada : ContaEntrada) : Observable<ContaEntrada>{
    return this.http.post<ContaEntrada>(this.apiURL, contaEntrada);

  }

  listaContasEntradaSalvas() : Observable<ContaEntrada[]>{
    return this.http.get<ContaEntrada[]>('https://destack360.herokuapp.com/api/recuperarContasEntrada');

  }
  recuperarInformacoesContaEntrada(identificadorContaEntrada : string) : Observable<ContaEntrada>{
    return this.http.post<ContaEntrada>('https://destack360.herokuapp.com/api/recuperarInformacoesContaEntrada', identificadorContaEntrada);
    
  }

  atualizarContaEntrada(contaEntrada: ContaEntrada, key: string){
    this.db.collection("CONTAS_ENTRADA").doc(key)
    .update(contaEntrada)
    .then((resultado) =>{
        if(resultado !== null){
            this.verificaIf = true;
        }else{
          this.verificaIf = false;
        }
    })
return this.verificaIf;

  }

  lancarEntrada(lancamentoContaEtrada : LancamentoEntrada){
    return this.http.post<LancamentoEntrada>('https://destack360.herokuapp.com/api/lancarEntrada', lancamentoContaEtrada).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }

  salvarContaParaLancamentosFuturos(contaSalvaParaLancamentosFuturos : ContaEntradaSalvaFutura){
    return this.http.post<ContaEntradaSalvaFutura>('https://destack360.herokuapp.com/api/salvarSugestao', contaSalvaParaLancamentosFuturos);
  }
}
