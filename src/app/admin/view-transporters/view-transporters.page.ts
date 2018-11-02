import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { InfiniteScroll, ItemSliding } from '@ionic/angular';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular'
import { snapshotToArray } from "../../common/common-utils.service";

@Component({
  selector: 'app-view-transporters',
  templateUrl: './view-transporters.page.html',
  styleUrls: ['./view-transporters.page.scss'],
})
export class ViewTransportersPage implements OnInit {


  transporters:any = [];
  limit = 10;

  constructor(private alertController:AlertController, private router:Router) {
    this.getTransporters();
  }

  ngOnInit() {
  }

  /**
   * To get transporters list from cloud
   */
  getTransporters = () => {
    let lastkey:any = '';
    let query = firebase.database().ref('transporters/').orderByChild('timestamp');
    query.on('value', resp => {
      this.transporters = snapshotToArray(resp);
    });
  }


  /**
   * To edit transporter details
   * @param data
   * @param key
     */
  editTransporter = (data:any, key) => {
    let newInfo = firebase.database().ref('transporters/' + key).update(data);
  }

  /**
   * To prompt to edit transporter details
   * @param transporter
   * @param slideItem
     */
  async promptEditTransporter(transporter:any, slideItem:ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Edit Transporter',
      inputs: [
        {name: 'value', type: 'text', placeholder: "Transporter", value: transporter.value}
      ],
      buttons: [
        {text: 'Cancel', role: 'cancel', cssClass: 'secondary'},
        {
          text: 'Ok', handler: (data) => {
          this.editTransporter({value: data.value.trim()}, transporter.key);
        }
        }
      ]
    });

    await alert.present();
  }

  /**
   * To prompt for delete transporter
   * @param key
   * @param slideItem
     */
  async promptDeleteTransporter(key, slideItem:ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this transporter?',
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
            firebase.database().ref('transporters/' + key).remove();
          }
        }
      ]
    });

    await alert.present();
  }

}