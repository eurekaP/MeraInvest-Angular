import { Injectable } from '@angular/core';
import { sesssionExpired } from '../../shared/data/constant-data';
import { LogoutService } from '../logout/logout.service';

@Injectable({
  providedIn: 'root'
})
export class SessionOutService {

  constructor(private _lo:LogoutService) { }

  handleSessionOutErr(error: any) {
    // if(error['ErrorNo'] == '1' || error['Error Msg'] == 'Session Expired') {
    //   this._lo.logOut(sesssionExpired);
    // }
    if(error['Error Msg'] == 'Session Expired') {
      this._lo.logOut(sesssionExpired);
    }
  }
}
