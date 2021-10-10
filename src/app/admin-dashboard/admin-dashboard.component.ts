import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations:[
    trigger('childAnimation', [
      // ...
      state('open', style({
        width: '1250px',
        opacity: 1,
        padding: '33px',
        backgroundColor: 'yellow',
        transform: 'translateX(-150px)'
      })),
      state('closed', style({
        width: '1100px',       
        opacity: 0.8,
        padding: '33px',
        backgroundColor: 'blue',        
      })),
      transition('* => *', [
        animate('1s'),
       
      ]),
    ]),
  ],

})
export class AdminDashboardComponent implements OnInit {

  user: Observable<any>; 
  isOpen = false; 
  isDisabled = false;            // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) {
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {                                                   // grab the user object from Firebase Authorization
          if (user) {
              let emailLower = user.email.toLowerCase();
              this.user = this.firestore.collection('users').doc(emailLower).valueChanges(); 
                   // get the user's doc in Cloud Firestore
          }
      });
  }
  logout(): void {
    this.afAuth.signOut();
}
toggle(){
this.isOpen = !this.isOpen;
}
}
