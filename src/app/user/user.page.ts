import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService } from "../auth-service";
import { LoginPage } from "../login/login.page";
import {snapshotToArray} from "../common/common-utils.service";
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

  today:Date = new Date();
  entryForm:FormGroup;
  transporterList:any = [];
  locationFromList:any = [];
  locationToList:any = [];
  vehiclesList:any = [];
  name: "10";
  constructor(private authService:AuthService, private formBuilder:FormBuilder, private router: Router,
              private alertController: AlertController) {

    setInterval(() => {
      this.today = new Date();
    }, 1000);


    this.entryForm = this.formBuilder.group({
      'date':[null],
      'tokenNo': [null, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.required])],
      'vehicleNo': [null, Validators.required],
      'transporterName': [null, Validators.required],
      'fromLocation': [null, Validators.required],
      'toLocation': [null, Validators.required],
      'tenMM': [null],/*,Validators.compose([Validators.pattern("^[0-9]+(.[0-9]{0,2})?$")])*/
      'twentyMM': [null],
      'fortyMM': [null],
      'dust': [null],
      'sand': [null],
      'boulder': [null],
      'diesel': [null],
      'bunkLocation': []
    })
  }
  ngOnInit() {

    // To load the list of locations, vehicles, transporters from the firebase database
    this.loadLocationsList();
    this.loadTransporterList();
    this.loadVehiclesList();
  }

  ionViewWillEnter() {
  }

  /**
   * To load locations list from cloud
   */
  loadLocationsList = () => {
    let query = firebase.database().ref('locations/').orderByChild ('timestamp');
    query.on('value', resp => {
      this.locationFromList = snapshotToArray(resp);
      this.locationToList = snapshotToArray(resp);
    });
  }

  /**
   * To load transporters list from cloud
   */
  loadTransporterList = () => {
    let query = firebase.database().ref('transporters/').orderByChild ('timestamp');
    query.on('value', resp => {
      this.transporterList = snapshotToArray(resp);
    });
  }

  /**
   * To load vehicles list from cloud
   */
  loadVehiclesList = () => {
    let query = firebase.database().ref('vehicles/').orderByChild ('timestamp');
    query.on('value', resp => {
      this.vehiclesList = snapshotToArray(resp);
    });
  }

  /**
   * To save a new entry to the cloud
   */
  saveEntry = () => {
    this.entryForm.controls['date'].setValue(new Date().toISOString());
    let newEntry = firebase.database().ref('entries/').push();
    newEntry.set(this.entryForm.value).then(()=> {
      this.showMessage(newEntry.key);
    });

    /*db.push().set(values).then(()=>{
     console.log('Successfully set');

     db.once('value').then((snap)=>{
     console.log(snap);
     });

     });*/


  }

  /**
   * Alert to show success message on saving a new entry
   * @param key
     */
  async showMessage(key) {
    const alert = await this.alertController.create({
      header: 'Entry saved successfully!',
      /*message: 'Message <strong>text</strong>!!!',*/
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.entryForm.reset();
            this.router.navigate(['/viewEntry/'+key]);
          }
        }
      ]
    });

    await alert.present();
  }

  logout = () => {
    this.authService.logout();
  }

}
