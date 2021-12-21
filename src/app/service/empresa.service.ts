import { Empresa } from './../model/empresa';
import { ContaEntradaCaixa } from './../model/conta-entrada-caixa';
import { ContaEntradaBanco } from './../model/conta-entrada-banco';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FornecedorModel } from './../model/fornecedor-model';
import { EmpresaModel } from './../models/empresaModel';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {



  constructor(private db: AngularFirestore,  private http : HttpClient) { }

  cadastrarEmpresa(empresa: Empresa) : Observable<any>{

    return this.http.post<Empresa>('https://destack360.herokuapp.com/api/cadastrar-empresa', empresa)
    //return this.http.post<Empresa>('http://localhost:8080/api/cadastrar-empresa', empresa)
/**

    this.db.collection("CLIENTES-CADASTRADOS").doc(empresa.identificadorCliente)
    .collection("EMPRESAS-CLIENTE").doc(empresa.cnpj).set(empresa) 
    .then((resultado: any) =>{
        console.log(resultado.key);
    }) */
  }


  cadastrarContaCaixa(contaCaixa: ContaEntradaCaixa, identificadorEmpresa: string, identificadorCliente: string){

    this.db.collection("CLIENTES-CADASTRADOS").doc(identificadorCliente)
    .collection("EMPRESAS-CLIENTE").doc(identificadorEmpresa)
    .collection("CONTA-CAIXA")  
    .add(contaCaixa)   
    .then((resultado: any) =>{
        console.log(resultado.key);
    })
  }

  cadastrarContaBanco(contaBanco: ContaEntradaBanco, identificadorEmpresa: string, identificadorCliente: string){

    this.db.collection("CLIENTES-CADASTRADOS").doc(identificadorCliente)
    .collection("EMPRESAS-CLIENTE").doc(identificadorEmpresa)
    .collection("CONTA-BANCO")
    .add(contaBanco)   
    .then((resultado: any) =>{
        console.log(resultado.key);
    })
  }


  cadastrarEmpresaClienteAPI(empresa: EmpresaModel): Observable<EmpresaModel>{
    return this.http.post<EmpresaModel>("https://destack360.herokuapp.com/api/cadastrar-empresa-cliente", empresa);
  }

  recuperarEmpresaService() : Observable<any[]>{    
    return this.db.collection("EMPRESAS-CADASTRADAS").valueChanges()
 
   }

}
