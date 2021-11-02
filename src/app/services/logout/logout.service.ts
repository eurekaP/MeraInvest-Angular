import { Injectable } from '@angular/core';
import { ApiUrlService } from '../api-url/api-url.service';
import { ApirequestService } from '../apirequest/apirequest.service';
import { Store } from '@ngrx/store';
import * as rootStore from '../../app.reducer';
import * as Auth from '../../shared/states/authentication/auth.action';
import { Router } from '@angular/router';
import { StorageService } from '../localstorage/storage.service';
import * as AuthData from '../../shared/states/auth-data/auth-data.action';
import { sesssionExpired } from '../../shared/data/constant-data';
import { MatDialog } from "@angular/material/dialog";
import { ModalBoxComponent } from '../../components/widgets/modal-box/modal-box.component';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable()
export class LogoutService {

  constructor(private _urls: ApiUrlService,
    private _route: Router,
    private _lstore: StorageService,
    private _dialog: MatDialog,
    private _sb: SnackbarService,
    private store: Store<rootStore.State>,
    private _req: ApirequestService) { }

  logOutLoader: any = new BehaviorSubject<any>(null)
  logOut(type: string = '', message: string = '') {
    console.log('test success');

    this._req.fetchApiData(this._urls.logoutUrl, {}, false).subscribe(
      (res: any) => {
        if (res != '') {
          this.logOutLoader.next(true);
          this.logOutAction(message);
          if (type == sesssionExpired){
            this._route.navigate(['/']);
          }
          //  this.openSessionModal();
        }
      },
      error => {

      },
      () => {

      }
    )
  }
  logOutAction(message = '') {
    let mess = message == '' ? 'You have Successfully Logged Out' : message;
    this._lstore.clearStorage();
    localStorage.clear();
    this._sb.openSnackBar(mess, 3000, 'batp_success_snackbar', 'right', 'top');
    this.store.dispatch(new Auth.LogoutAuthentication());
    this.store.dispatch(new AuthData.UserAuthenticationData({}));
    this.store.dispatch(new AuthData.UserAuthenticationDetails({}));
    this._route.navigate(['/']);
  }
  logOutPrevSession(id: any) {
    let data = {
      idUser: id
    }
    this._req.fetchApiData(this._urls.logoutPreviousSessionUrl, data).subscribe(
      (res: any) => {
        if (res != '') {
          this.logOutAction();
        }
      },
      error => {

      },
      () => {

      }
    )
  }
public isUserLogin(){
  this._req.fetchApiData(this._urls.isUserLogin,{}).subscribe(
    (res: any) => {
      if (res != '') {
        // this.logOutAction();
      }
    },
    error => {

    },
    () => {

    }
  )

}
  openSessionModal() {
    let message = 'Your Session Has Been Expired Due to Inactivity. Kindly Login to Continue.'
    const dialogRef = this._dialog.open(ModalBoxComponent, {
      width: '450px',
      data: {
        message: message,
        buttonText: 'Go To LogIn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._route.navigate(['/']);
      }
    });
  }
}
