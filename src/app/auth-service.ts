import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  role: string;

  //constructor(name: string, role: string) {
  //  this.name = name;
  //  this.role = role;
  //}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;

  constructor(private router: Router) { }

  login(name: string, password: string): any {
    return new Promise((resolve, reject) => {
      if (name == "admin" && password == "admin") {
        this.currentUser = {
          name: name,
          role: 'admin'
        };
        resolve(this.currentUser);
      } else if (name == "user" && password =="user") {

        this.currentUser = {
          name: name,
          role: 'user'
        };
        resolve(this.currentUser);
      }
    });
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
