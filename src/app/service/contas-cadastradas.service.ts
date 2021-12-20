import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore/public_api';

@Injectable({
  providedIn: 'root'
})
export class ContasCadastradasService {

  constructor( private http : HttpClient,
    private firebase: AngularFirestore) { }

    recuperarContasCadastradas(): Observable<any[]>{
        return this.firebase.collection("CONTAS-CADASTRADAS").valueChanges();
    }
}
