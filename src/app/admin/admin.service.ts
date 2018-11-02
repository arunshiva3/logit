import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }


  /*getUsers(limit, lastKey?) {
    let query =  {
      orderByKey: true,
      limitToFirst: limit,
    }

    if (lastKey) query['startAt'] = lastKey

    return firebase.database().ref('users/', {
      query
    })
  }*/
}
