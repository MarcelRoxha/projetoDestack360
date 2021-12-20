import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router   } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn: boolean;
  entraAnonimo: any;
 
  mostrarMenuCima = new EventEmitter<boolean>();

  constructor(private router : Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userLoggedIn = false;
    this.afAuth.onAuthStateChanged((user)=>{
      if(user){
        this.userLoggedIn = true;
        this.mostrarMenuCima.emit(true);
        
      }else{
        this.userLoggedIn = false;
        this.mostrarMenuCima.emit(false);
      }
    })
   }

   loginUser(email: string, password: string): Promise<any>{
     return this.afAuth.signInWithEmailAndPassword(email, password)
     .then(()=>{
       console.log('Auth Service: LoginUser: Success');

     }).catch(error=>{
      console.log('Auth Service: LoginUser: Erro');
      console.log('Error code' , error.code);
      console.log('Erro:', error);
      if(error.code){
        return {isValid: false, message: error.message};  
      }else{
        return false;
      }

     })
   }


   signup(user: any): Promise<any> {
     return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
     .then((result)=>{
       let emailLower = user.email.toLowerCase();
       this.afs.collection('users').doc(emailLower).set({ 
          accountType : 'endUser',    
          displayName: user.displayName,
          displayName_lower: user.displayName,
          email: user.email, 
          email_lower: emailLower
        })
       user.sendEmailVerification();
     }).catch(error=>{
      console.log('Auth Service: Signup: Erro');
     
      if(error.code){
        return {isValid: false, message: error.message};  
      }else{
        return false;
      }

    })
}
/*eftLancerAnonimo(lancamento: any, emailUsuario : string, check: boolean): Promise<any> {
  

  //if(check === true){
//
   // return this.afs.collection('users').doc(emailUsuario).collection('lancamento_entrada').doc().set({
      data : lancamento.datalancamentoentrada,    
      valor: lancamento.valorlancamentoentrada,
      //codentrada: lancamento.codentrada,
      //codsaida: lancamento.codsaida, 
      info: "Entrada Anonima" 
    }).then(resultado =>{
      console.log("Resultado: ", resultado);
      console.log(this.textoEntraAnonimo)
    })
  }


  return this.afs.collection('users').doc(emailUsuario).collection('lancamento_entrada').doc().set({
    data : lancamento.datalancamentoentrada,    
    valor: lancamento.valorlancamentoentrada,
    //codentrada: lancamento.codentrada,
    //codsaida: lancamento.codsaida, 
    info: this.textoEntraAnonimo.toString  
  }).then(resultado =>{
    console.log("Resultado: ", resultado);
    console.log(this.textoEntraAnonimo)
  })
}**/

/*
eftLancer(lancamento: any, emailUsuario : string, check: boolean): Promise<any> {

 
    return this.afs.collection('users').doc(emailUsuario).collection('lancamento_entrada').doc().set({
      data : lancamento.datalancamentoentrada,    
      valor: lancamento.valorlancamentoentrada,
      //codentrada: lancamento.codentrada,
      //codsaida: lancamento.codsaida, 
      info: lancamento.infolancamentoentrada    
    }).then(resultado =>{
      console.log("Resultado: ", resultado);
    })
  


  

}

*/

  resetPassword(email: string, password: string): Promise<any>{
    return this.afAuth.sendPasswordResetEmail(email)
    .then(()=>{
      console.log('Auth Service: ResetPassword: Success');
    }).catch(error=>{
      console.log('Auth Service: ResetPassword: Erro');
      console.log('Error code' , error.code);
      console.log('Erro:', error);
      if(error.code){
          return error
      }else{

      }
    })
  }

  async resendVericationEmail(){
      return (await this.afAuth.currentUser)?.sendEmailVerification()
        .then(()=>{
          console.log('Auth Service: resendVericationEmail: Success');
        }).catch(error=>{
          console.log('Auth Service: resendVericationEmail: Erro');
          console.log('Error code' , error.code);
          console.log('Erro:', error);
          if(error.code){
              return error
          }else{
    
          }
        })
  }

  logoutUser(): Promise<void>{
    return this.afAuth.signOut()
      .then(()=>{
        this.router.navigate(['/home']);
      }).catch(error=>{
        console.log('Auth Service: logoutUser: Erro');
        console.log('Error code' , error.code);
        console.log('Erro:', error);
        if(error.code){
            return error
        }else{
  
        }
      })
  }
  setUserInfo(playload: object){
    console.log('Auth Service: save info user: Success');
    this.afs.collection('users').add(playload).then(function (res){
      console.log("Auth Service: setInfo: response...");
      console.log(res);
    })
  } 
}
