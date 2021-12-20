import { Usuario } from './../model/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



  constructor(private db: AngularFirestore,  private http : HttpClient) { }


  cadastrarUsuarioService(usuarioFormulario: Usuario) : Observable<any>{
return this.http.post<Usuario>('https://destack360.herokuapp.com/api/recuperarInformacoesCliente', usuarioFormulario)
//return this.http.post<Usuario>('http://localhost:8080/api/cadastrar-usuario', usuarioFormulario)

  }

  atualizarUsuarioService(){

  }

  deletarUsuarioService(){

  }

  vincularEmpresarUsuarioService(){

  }

  recuperarUsuariosService() : Observable<any[]>{    
   return this.db.collection("USUARIOS-CADASTRADOS").valueChanges()

  }

}
