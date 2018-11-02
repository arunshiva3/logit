import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray }
    from '@angular/forms';
import { NavController, AlertController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from "../auth-service";
import {CommonUtilsService} from "../common/common-utils.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private commonoUtils: CommonUtilsService) {
    this.loginForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'password': [null, Validators.required]
    })
  }

  ngOnInit() {
  }


  /**
   * Login to check username and password
   */
  login() {
    this.authService.login(this.loginForm.value.name.trim(), this.loginForm.value.password).then(res => {
      if (res) {
        if(res.role == 'admin')
          this.router.navigate(['admin']);
        else if(res.role == 'user')
          this.router.navigate(['user']);
      }
    }).catch( err =>{
      console.log(err);
      this.commonoUtils.presentToast("Invalid Credentials")
    });
    /*this.submitted = true;
     this.authService.loginUser(this.loginForm.value.name, this.loginForm.value.password).then(res => {
     console.log(res)
     })*/
  }

}
