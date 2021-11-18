import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  isProgressVisible: boolean;
  loginForm: FormGroup;
  firebaseErrorMessage: string;
  user: Observable<any>;
  verificaUserLogado : boolean = false;

  constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {
 this.isProgressVisible = false;

      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });

      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
        if (user) {
            let emailLower = user.email.toLowerCase();
            this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
                 // get the user's doc in Cloud Firestore
        }
    });
    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required)
    });

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


  logout(): void {
      this.afAuth.signOut();
  }


}
