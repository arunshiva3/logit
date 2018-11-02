import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import {snapshotToObject} from "./common/common-utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any = null;

  constructor(private router: Router) { }

  /**
   * Login by checking if username and password exists in the firebase database
   * @param name
   * @param password
   * @returns {Promise<T>}
     */
  login(name: string, password: string): any {

    return new Promise((resolve, reject) => {
      firebase.database().ref().child("users").orderByChild("name").equalTo(name).on("value", function (resp) {
        if (resp.exists()) {
          let user = resp.val()[Object.keys(resp.val())[0]];
          if (user.password == password) {
            resolve({name: user.name, role: user.role});
          } else {
            reject("Invalid credentials");
          }
        } else {
          reject("Invalid credentials");
        }
      });
    });
  }

  /**
   * Email id validation
   * @param email
   * @param password
   * @returns {Promise<firebase.auth.UserCredential>}
     */
  loginUser = (email: string, password: string): Promise<any> =>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }


  isLoggedIn() {
    return this.currentUser != null;
  }

  isAdmin() {
    return this.currentUser.role == 'admin';
  }

  logout = () => {
    this.currentUser = null;
    this.router.navigate(['login']);
  }
}
