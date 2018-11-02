import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import * as firebase from 'firebase';
import {snapshotToObject} from "../common/common-utils.service";
@Component({
    selector: 'app-view-entry',
    templateUrl: './view-entry.page.html',
    styleUrls: ['./view-entry.page.scss'],
})
export class ViewEntryPage implements OnInit {

    entry: any = {};
    constructor(private route: ActivatedRoute,
                public router: Router) {}

    ngOnInit() {
        firebase.database().ref('entries/'+this.route.snapshot.paramMap.get('key')).on('value', resp => {
            this.entry = snapshotToObject(resp);
        });
    }

}

