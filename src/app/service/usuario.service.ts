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
return this.http.post<Usuario>('https://destack360.herokuapp.com/api/cadastrar-usuario', usuarioFormulario)
//return this.http.post<Usuario>('http://localhost:8080/api/cadastrar-usuario', usuarioFormulario)

  }

  atualizarUsuarioService(usuarioAtualiza: Usuario) : Observable<any>{
    return this.http.post<Usuario>('https://destack360.herokuapp.com/api/atualizar-usuario', usuarioAtualiza)

    //return this.http.post<Usuario>('http://localhost:8080/api/atualizar-usuario', usuarioAtualiza)
  }

  deletarUsuarioService(usuarioDeleta: Usuario){
    return this.db.collection("USUARIOS-CADASTRADOS")
    .doc(usuarioDeleta.email)
    .delete()

  }

  vincularEmpresarUsuarioService(){

  }

  recuperarUsuariosService() : Observable<any[]>{    
   return this.db.collection("USUARIOS-CADASTRADOS").valueChanges()

  }

}
