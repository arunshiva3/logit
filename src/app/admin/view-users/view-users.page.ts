import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { InfiniteScroll, ItemSliding } from '@ionic/angular';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular'
import { snapshotToArray } from "../../common/common-utils.service";
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {

  users: any = [];
  limit = 10;
  responseArray = [];
  lastObj = {}
  stopScroll = false;
  constructor(private alertController: AlertController, private router: Router) {
    this.getUsers();
  }
  ngOnInit() {}

  ionViewDidLeave() {
    this.users = [];
    this.stopScroll = false;
  }
  /**
   * Get users from cloud
   */
  getUsers = (a?) =>{
    let query = firebase.database().ref('users/').orderByChild ('name')//.limitToFirst(8);
    /*if(a){
     query = firebase.database().ref('users/').orderByChild ('name')
     .limitToFirst(8).startAt(this.lastObj.name);
     }*/
    query.on('value', resp => {
      this.users = snapshotToArray(resp)
      /*this.responseArray = snapshotToArray(resp);
      if(this.responseArray.length < 8) {
       this.stopScroll = true;
       }
       this.lastObj = this.responseArray.pop();
      this.users = this.users.concat(this.responseArray);*/
    });
  }

  /**
   * To edit a user details
   * @param data
   * @param key
   */
  editUser = (data:any, key) =>{
    let newInfo = firebase.database().ref('users/'+key).update(data);
    // this.router.navigate(['/view-users']);
  }

  /**
   * To prompt for edit user details
   * @param user
   * @param slideItem
   */
  async promptEditUser(user:any, slideItem: ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Edit User details',
      inputs: [
        {name: 'name',type: 'text',placeholder: "Username", value: user.name},
        {name: 'password',type: 'text',placeholder: "Password", value: user.password}
      ],
      buttons: [
        {text: 'Cancel',role: 'cancel',cssClass: 'secondary'},
        {text: 'Ok',handler: (data) => {
          this.editUser({name: data.name.trim(), password: data.password.trim()}, user.key);
        }}
      ]
    });

    await alert.present();
  }

  /**
   * To prompt to delete a user
   * @param key
   * @param slideItem
   */
  async promptDeleteUser(key, slideItem: ItemSliding) {
    slideItem.close();
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete this user?',
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
            firebase.database().ref('users/'+key).remove();
          }
        }
      ]
    });

    await alert.present();
  }




  loadData(event) {
    setTimeout(() => {

      this.getUsers('a')
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      /*if (data.length == 1000) {
       event.target.disabled = true;
       }*/
    }, 500);
  }
}


