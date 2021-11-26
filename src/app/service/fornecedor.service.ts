import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FornecedorModel } from './../model/fornecedor-model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  fornecedorInfo: any
  verificaIf : boolean ;

  constructor(private db: AngularFirestore,  private http : HttpClient) { }


  cadastrar(fornecedor: FornecedorModel){

    this.db.collection("FORNECEDORES").doc(fornecedor.cnpj).set(fornecedor)  
    .then((resultado: any) =>{
        console.log(resultado.key);
    })


  }

  atualizar(fornecedor: FornecedorModel, key: string){
    this.db.collection("FORNECEDORES").doc(key)
    .update(fornecedor)
    .then((resultado) =>{
        if(resultado !== null){
            this.verificaIf = true;
        }else{
          this.verificaIf = false;
        }
    })
return this.verificaIf;
  }

  getAll(){
    this.db.collection("FORNECEDORES").snapshotChanges()
    .pipe(
      map(changes =>{
        return changes
      }     
    ))
  }
  delete(key: string){
    this.db.collection("FORNECEDORES").doc(key).delete();
  }

  recuperarFornecedoresCadastrados() :Observable<FornecedorModel[]>{
    return this.http.get<FornecedorModel[]>('https://destack360.herokuapp.com/api/listafornecedores');

  }
  informacoesFornecedor(id: string){
   return this.db.collection("FORNECEDORES").doc(id).valueChanges()

}
}