import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ApirequestService } from "../../services/apirequest/apirequest.service";
import { TwoFactorService } from "../../services/twoFactor/two-factor.service";
import { LoginService } from "../../services/login/login.service";
import {LogoutService} from "../../services/logout/logout.service";

import { validateEmail, validNumber } from "../../shared/form-validators";

import { devEnv, captchaKey } from "../../config/batp.config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginForm!: FormGroup;
  public userFormSubmitted: boolean = false;
  public showLoader: boolean = false;
  public loginStatus: boolean = false;
  public loginMessage: any = '';
  public captchaKey: string = captchaKey;

  public userLoginData: any;
  public isTwoFactorEnabled: boolean = false;
  public templateCode: number = 1;
  loginStatSubs: any;
  loginResData: any = [];
  loginMsgSubs: any;
  loaderStatSubs: any;
  tFaData: any;
  checkTfaSub: any;

  constructor(
    private _fb: FormBuilder,
    private _req: ApirequestService,
    private _route: Router,
    private _tFa: TwoFactorService,
    private _auth: LoginService,
    private  _lo: LogoutService,
  ) { }

  ngOnInit(): void {
    this.userLoginFormInit();
  }

  ngOnDestroy() {
    if (typeof this.loginStatSubs != 'undefined') {
      this.loginStatSubs.unsubscribe();
    }
    if (typeof this.loginMsgSubs != 'undefined') {
      this.loginMsgSubs.unsubscribe();
    }
    if (typeof this.loaderStatSubs != 'undefined') {
      this.loaderStatSubs.unsubscribe();
    }
    if (typeof this.checkTfaSub != "undefined") {
      this.checkTfaSub.unsubscribe();
    }
  }

  userLoginFormInit() {
    this.userLoginForm = this._fb.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required]],
      g_recatcha: ['', devEnv ? [] : [Validators.required]]
    });
  }

  userLogin() {
    this.userFormSubmitted = true;
    if (this.userLoginForm.valid) {
      this._auth.loginStatus.next(null);
      this._tFa.twoFactorData.next(null);
      this.resetMessages();
      this.showLoader = true;
      let formVal: any = this.userLoginForm.value;
      this.userLoginData = {
        email: formVal.email,
        password: formVal.password
      };
      // this._tFa.checkTwoFactorEnabled(formVal.email);
      // this.checkTfaStatus();

      this._auth.login(this.userLoginData);
      this.getLoginStatus();
      this.getLoginMessages();
      this.loaderStatus();
    }
  }

  loginUser() {
    this.showLoader = true;
    this._auth.login(this.userLoginData);
    this.getLoginStatus();
    this.getLoginMessages();
    this.loaderStatus();
  }

  resetMessages() {
    this.loginStatus = false;
    this._auth.loginErrMsg.next('');
    this.loginMessage = '';
  }

  getLoginStatus() {
    this.loginStatSubs = this._auth.loginStatus.subscribe((data: Object) => {
      if (data) {
        if (data.hasOwnProperty('idUser')) {
          this.loginResData = data;
          /*if (this.loginResData.user2fa === 1) {
            this.enableTwoFactor();
          } else {*/
            if (this.loginResData.isActive !== 3) {
              this._auth.saveLoginData(this.loginResData);
            } else if (this.loginResData.isActive === 3) {
              this.templateCode = 3;
            }
          //}
        }
      }
    });
  }

  loaderStatus() {
    this.loaderStatSubs = this._auth.showLoader.subscribe((data: any) => {
      this.showLoader = data;
    });
  }

  getSlStatus($evt: any) {
    this.showLoader = true;
    if (Object.keys($evt.error).length != 0) {
      this.loginStatus = false;
      this.showLoader = false;
      this.loginMessage = $evt.error['Error Description'];
    }
  }

  getLoginMessages() {
    this.loginMsgSubs = this._auth.loginErrMsg.subscribe((data: any) => {
      if (data != '') {
        this.loginMessage = data;
      }
    });
  }

}
