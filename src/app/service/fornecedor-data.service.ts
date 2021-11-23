import { FornecedorModel } from './../model/fornecedor-model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FornecedorDataService {
  
  private fornecedorSource = new BehaviorSubject({fornecedorModel: FornecedorModel , id: ''});
  currentFornecedor = this.fornecedorSource.asObservable();

  constructor() { }

 
}
