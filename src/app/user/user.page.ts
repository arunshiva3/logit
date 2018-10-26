import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from "../auth-service";
import { LoginPage } from "../login/login.page";
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  ref = firebase.database().ref('infos/');
  rootPage:any = LoginPage;
  isAdmin:boolean = false;
  pages = [];
  /*adminPages = [
    {title: 'Add User', page: 'addUser', icon: 'home'},
    {title: 'Reports', page: 'addUser', icon: 'planet'}
  ];
  userPages = [
    {title: 'Log Entry', page: 'addUser', icon: ''}
  ];*/
  today:Date = new Date();
  entryForm:FormGroup;
  transporterList:any = [];
  locationFromList:any = [];
  locationToList:any = [];
  name: "10";
  decimalEX: "^[0-9]+(.[0-9]{0,2})?$";
  constructor(private authService:AuthService, private formBuilder:FormBuilder, private router: Router,
              private toastController: ToastController) {
    setInterval(() => {
      this.today = new Date();
    }, 1000);
    this.entryForm = this.formBuilder.group({
      'date': [new Date().toISOString().substring(0, 10)],
      'tokenNo': [null, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])],
      'vehicleNo': [null, Validators.required],
      'transporterName': [null, Validators.required],
      'fromLocation': [null, Validators.required],
      'toLocation': [null, Validators.required],
      '10mm': [null,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
      '20mm': [null,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
      '40mm': [null,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
      'dust': [null,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
      'sand': [null,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
      'boulder': [null,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
      'diesel': [null,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])],
      'bunkLocation': []
    })
  }
  ngOnInit() {

    if (this.authService.isAdmin()) {
      this.isAdmin = true;
     //  this.pages = this.adminPages;
    } else {
      this.isAdmin = false;
      // this.pages = this.userPages;
    }

    // todo load transporters list from db
    // loadTransporterList
    this.transporterList = ['Srinivas Goud', 'Bhadrakali', 'RK', 'Jai Hanuman']

    // todo locations list
    this.locationFromList = ['Jagityal', 'Metpalli', 'Dharmaram', 'Balakonda'];
    this.locationToList = ['Balakonda', 'Jagityal', 'Metpalli', 'Dharmaram'];
  }

  ionViewWillEnter() {
  }

  loadTransporterList = () => {
    // load data from db
  }


  saveEntry = () => {
    let newEntry = firebase.database().ref('entries/').push();
    newEntry.set(this.entryForm.value).then(()=> {
      this.presentToast();
      this.entryForm.reset();
    });

    /*db.push().set(values).then(()=>{
     console.log('Successfully set');

     db.once('value').then((snap)=>{
     console.log(snap);
     });

     });*/


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Entry Saved Successfully.',
      duration: 5000,
    });

    toast.present();
  }

  logout = () => {
    this.authService.logout();
  }

}
