import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  user: Observable<any>;  
  
  constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore, private router : Router) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);

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
toggleSidebar() {
  this.toggleSidebarForMe.emit();
}
}

