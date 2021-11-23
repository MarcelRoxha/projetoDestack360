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

  cadastrarEmpresa(empresa: EmpresaModel, identificadorCliente: string){

    this.db.collection("CLIENTES-CADASTRADOS").doc(identificadorCliente)
    .collection("EMPRESAS-CLIENTE").doc(empresa.cnpj).set(empresa) 
    .then((resultado: any) =>{
        console.log(resultado.key);
    })

  }


  cadastrarEmpresaClienteAPI(empresa: EmpresaModel): Observable<EmpresaModel>{
    return this.http.post<EmpresaModel>("https://destack360.herokuapp.com/api/cadastrar-empresa-cliente", empresa);
  }

}
