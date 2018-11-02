import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { InfiniteScroll, ItemSliding } from '@ionic/angular';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular'
import { snapshotToArray } from "../../common/common-utils.service";
@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.page.html',
  styleUrls: ['./view-vehicles.page.scss'],
})
export class ViewVehiclesPage implements OnInit {

  vehicles: any = [];
  limit = 10;

  constructor(private alertController: AlertController, private router: Router) {
    this.getVehicles();
  }
  ngOnInit() {  }

  /**
   * To get the list of vehicles from the cloud
   */
  getVehicles = () =>{
    let lastkey: any = '';
    let query = firebase.database().ref('vehicles/').orderByChild ('timestamp');

    query.on('value', resp => {
      this.vehicles = snapshotToArray(resp);
    });
  }

  /**
   * To edit a vehicel details
   * @param data
   * @param key
     */
  editVehicle = (data:any, key) =>{
    let newInfo = firebase.database().ref('vehicles/'+key).update(data);
    // this.router.navigate(['/view-users']);
  }

  /**
   * To prompt for a vehicle edit
   * @param vehicle
   * @param slideItem
     */
  async promptEditVehicle(vehicle:any, slideItem: ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Edit Vehicle details',
      inputs: [
        {name: 'value',type: 'text',placeholder: "Vehicle", value: vehicle.value}
      ],
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Ok',handler: (data) => {
          this.editVehicle({value: data.value.trim()}, vehicle.key);
        }}
      ]
    });

    await alert.present();
  }

  /**
   * To prompt for delete a vehicle
   * @param key
   * @param slideItem
     */
  async promptDeleteVehicle(key, slideItem: ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this vehicle?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            slideItem.close();
            firebase.database().ref('vehicles/'+key).remove();
          }
        }
      ]
    });

    await alert.present();
  }
}