import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.page.html',
  styleUrls: ['./addUser.page.scss'],
})
export class AddUserPage implements OnInit {
  ref = firebase.database().ref('infos/');
  addUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addUserForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  ngOnInit() {
  }


  addUser() {
    console.log(this.addUserForm.value)

    /*let newInfo = firebase.database().ref('users/').push();
    newInfo.set({
      name : this.addUserForm.value.name, // some another information for user you could save it here.
      password: this.addUserForm.value.password,      // you could save the ID as field in document.
      role: 'user'
    });*/



  }

}
