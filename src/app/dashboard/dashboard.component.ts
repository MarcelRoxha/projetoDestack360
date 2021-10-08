import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Observable<any>;  
  loginForm: FormGroup;            // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

    constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
      this.router.navigate(['/dashboard']);    
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            console.log('Dashboard: user', user);

            if (user) {
                let emailLower = user.email.toLowerCase();
                this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
                   
            }
        });
    }

    logout(): void {
      this.afAuth.signOut();
  }

}
