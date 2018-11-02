import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {

  constructor(private alertController: AlertController, public toastController: ToastController) { }

  /**
   * To show an alert message
   * @param message
     */
  async showMessage(message: string) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * To show a toast message
   * @param message
     */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}

/**
 * To convert a snapshot response to json array
 * @param snapshot
 * @returns {Array}
 */
export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

/**
 * To convert snapshot response to json object
 * @param snapshot
 * @returns {*}
 */
export const snapshotToObject = snapshot => {
  let item = snapshot.val();
  item.key = snapshot.key;
  return item;
};