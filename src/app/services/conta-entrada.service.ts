import { ContaCadastrada } from './../model/conta-cadastrada';
import { LancamentoSaida } from './../models/LancamentoSaidaModel';
import { ContaEntradaSalvaFutura } from './../models/lancamentoEntradaSalvoFuturo';
import { LancamentoEntrada } from './../models/lancamentoEntradaModel';
import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContaEntrada } from '../models/contaEntradaModel';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FornecedorModel } from '../model/fornecedor-model';
import { ServicoFornecedorModel } from '../models/servicoFornecedorModel';

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


  cadastrarConta(contaCadastradaRecebida: ContaCadastrada) : Observable<any>{
    return this.http.post<ContaCadastrada>('https://destack360.herokuapp.com/api/cadastrar-conta',contaCadastradaRecebida)
  }

  listaContasEntradaSalvas() : Observable<ContaEntrada[]>{
    return this.http.get<ContaEntrada[]>('https://destack360.herokuapp.com/api/recuperarContasEntrada');

  }

  listaFornecedoresCadastrados() : Observable<FornecedorModel[]>{
    return this.http.get<FornecedorModel[]>('https://destack360.herokuapp.com/api/recuperar-fornecedores-cadastrados');

  }

  recuperarServicosFornecedor(identificadorContaEntrada : string) : Observable<ServicoFornecedorModel[]>{
    return this.http.post<ServicoFornecedorModel[]>('https://destack360.herokuapp.com/api/recuperar-servicos-fornecedor-selecionado', identificadorContaEntrada);
    
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
    return this.http.post<LancamentoEntrada>('https://destack360.herokuapp.com/api/lancar-entrada-caixa', lancamentoContaEtrada).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }

  lancarEntradaBanco(lancamentoContaEtrada : LancamentoEntrada){
    return this.http.post<LancamentoEntrada>('https://destack360.herokuapp.com/api/lancar-entrada-banco', lancamentoContaEtrada).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }

  salvarContaParaLancamentosFuturos(contaSalvaParaLancamentosFuturos : ContaEntradaSalvaFutura){
    return this.http.post<ContaEntradaSalvaFutura>('https://destack360.herokuapp.com/api/salvarSugestao', contaSalvaParaLancamentosFuturos);
  }


  
  lancarSaida(lancamentoSaida : LancamentoSaida){
    return this.http.post<LancamentoSaida>('https://destack360.herokuapp.com/api/lancar-saida-caixa', lancamentoSaida).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }

  lancarSaidaBanco(lancamentoSaida : LancamentoSaida){
    return this.http.post<LancamentoSaida>('https://destack360.herokuapp.com/api/lancar-saida-banco', lancamentoSaida).pipe(tap(()=>{
      this._refreshNeeded$.next() 
      
    }));
  }
}
