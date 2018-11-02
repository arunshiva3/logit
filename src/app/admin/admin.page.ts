import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth-service";
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { CommonUtilsService } from "../common/common-utils.service";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(private authService:AuthService, private alertController:AlertController,
              private commonUtils: CommonUtilsService) { }

  ngOnInit() {
  }

  /**
   * Alert prompt to add a new user
   */
  async promptAddUser() {
    const alert = await this.alertController.create({
      header: 'Add User',
      inputs: [
        {name: 'name',type: 'text',placeholder: "Username"},
        {name: 'password',type: 'text',placeholder: "Password"}
      ],
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Ok',handler: (data) => {
          this.addUser(data);
        }}
      ]
    });

    await alert.present();
  }

  /**
   * alert prompt to add a new location
   */
  async promptAddLocation() {
    const alert = await this.alertController.create({
      header: 'Add Location',
      inputs: [
        {name: 'location',type: 'text',placeholder: "Location"}],
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Ok',handler: (data) => {
          this.addRecord(data.location, 'locations/', "Location saved successfully!");
        }}
      ]
    });

    await alert.present();
  }

  /**
   * Add a new transporter
   */
  async promptAddTransporter() {
    const alert = await this.alertController.create({
      header: 'Add Transporter',
      inputs: [
        {name: 'transporter',type: 'text',placeholder: "Transporter"}
      ],
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Ok',handler: (data) => {
          this.addRecord(data.transporter,"transporters/", "Transporter saved successfully!");
        }}
      ]
    });

    await alert.present();
  }

  /**
   * Prompt to add a new vehicle
   */
  async promptAddVehicle() {
    const alert = await this.alertController.create({
      header: 'Add Vehicle',
      inputs: [
        {name: 'vehicle',type: 'text',placeholder: "Vechicle"}
      ],
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Ok',handler: (data) => {
          this.addRecord(data.vehicle,"vehicles/", "Vehicle added successfully!");
        }}
      ]
    });

    await alert.present();
  }


  /**
   * Add a user to the firebase
   * @param value
   */
  addUser(value) {
    let newInfo = firebase.database().ref('users/').push();
    newInfo.set({
      name : value.name.trim(),
      password: value.password.trim(),
      role: 'user'
    }).then(()=> {
      this.commonUtils.showMessage("User saved successfully!");
    });
  }

  /**
   * Add a new record to the firebase database
   * @param value
   */
  addRecord(value, database, message) {
    let newInfo = firebase.database().ref(database).push();
    newInfo.set({
      value : value.trim(), // some another information for user you could save it here
    }).then(()=> {
      this.commonUtils.showMessage(message);
    });
  }

  logout = () => {
    this.authService.logout();
  }
}