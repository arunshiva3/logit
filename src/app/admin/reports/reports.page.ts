import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  today: Date = new Date().toISOString().slice(0,10);
  reportForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.reportForm = this.formBuilder.group({
      'startDate': [this.today],
      'endDate': []
    })
  }

  ngOnInit(){

  }

  getReport() {
    console.log(this.reportForm.value);

  }


}
