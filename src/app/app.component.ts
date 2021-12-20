import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'destack360-version5';

  user: Observable<any>;
  verificaUserLogado : boolean = false;
  isProgressVisible: boolean;
  firebaseErrorMessage: string;
  loginForm: FormGroup;
  sideBarOpen = true;
  mostrarMenu: boolean = false;
  
  constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
   
     }

     ngOnInit(){

        this.authService.mostrarMenuCima.subscribe(verificaUsuarioLogado=>{
            this.mostrarMenu = verificaUsuarioLogado;
        })

     }

     loginUser() {
      this.isProgressVisible = true;                          // show the progress indicator as we start the Firebase login process
  
      if (this.loginForm.invalid)
          return;
  
      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
          this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
          if (result !== null) {                               // null is success, false means there was an error
              console.log('logging in...');   
              this.verificaUserLogado = true;            // when the user is logged in, navigate them to dashboard
          }
          else if (result.isValid == false) {
              console.log('login error', result);
              this.firebaseErrorMessage = result.message;
              this.verificaUserLogado = false; 
          }
      });
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
