import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray }
    from '@angular/forms';
import { NavController, AlertController} from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from "../auth-service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public navCtrl: NavController,
              private alertCtrl: AlertController, private router: Router) {
    this.loginForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.loginForm.value.name, this.loginForm.value.password).then(res => {
      if (res) {
        if(res.role == 'admin')
          this.router.navigate(['admin']);
        else if(res.role == 'user')
          this.router.navigate(['user']);
      }
        /*let alert = this.alertCtrl.create({
          title: 'Login failed',
          message: 'Please check your credentials',
          buttons: ['OK']
        });
        alert.present();*/
        /*this.router.navigate(['home']);*/
    });
  }

}
