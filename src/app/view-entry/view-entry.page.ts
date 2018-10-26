import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-view-entry',
  templateUrl: './view-entry.page.html',
  styleUrls: ['./view-entry.page.scss'],
})
export class ViewEntryPage implements OnInit {

  constructor(private route: ActivatedRoute,
              public router: Router) {
    firebase.database().ref('infos/'+this.route.snapshot.paramMap.get('key')).on('value', resp => {
       console.log(snapshotToObject(resp));
    });
  }

  ngOnInit() {
  }

}
export const snapshotToObject = snapshot => {
    let item = snapshot.val();
    item.key = snapshot.key;

    return item;
}
