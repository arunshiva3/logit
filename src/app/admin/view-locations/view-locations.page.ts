import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { InfiniteScroll, ItemSliding } from '@ionic/angular';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular'
import { snapshotToArray } from "../../common/common-utils.service";
import {CommonUtilsService} from "../../common/common-utils.service";
@Component({
  selector: 'app-view-locations',
  templateUrl: './view-locations.page.html',
  styleUrls: ['./view-locations.page.scss'],
})
export class ViewLocationsPage implements OnInit {

  locations: any = [];
  limit = 10;

  constructor(private alertController: AlertController, private router: Router, private commonUtils: CommonUtilsService) {
    this.getLocations();
  }
  ngOnInit() {  }

  /**
   * Get locations from cloud
   */
  getLocations = () =>{
    let lastkey: any = '';
    let query = firebase.database().ref('locations/').orderByChild ('timestamp');
    query.on('value', resp => {
      this.locations = snapshotToArray(resp);
    });
  }


  /**
   * Edit location
   * @param data
   * @param key
     */
  editLocation = (data:any, key) =>{
    let newInfo = firebase.database().ref('locations/'+key).update(data).then(()=>{
      this.commonUtils.presentToast("Success");
    });
  }

  /**
   * To prompt for location
   * @param location
   * @param slideItem
     */
  async promptEditLocation(location:any, slideItem: ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Edit Location',
      inputs: [
        {name: 'value',type: 'text',placeholder: "Location", value: location.value}
      ],
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Ok',handler: (data) => {
          this.editLocation({value: data.value.trim()}, location.key);
        }}
      ]
    });

    await alert.present();
  }

  /**
   * To prompt for delete location
   * @param key
   * @param slideItem
     */
  async promptDeleteLocation(key, slideItem: ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this location?',
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
            firebase.database().ref('locations/'+key).remove();
          }
        }
      ]
    });

    await alert.present();
  }
}
