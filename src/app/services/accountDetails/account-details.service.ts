import { Injectable, OnInit } from '@angular/core';
import { ApirequestService } from '../apirequest/apirequest.service';
import { ApiUrlService } from '../api-url/api-url.service';
import { BehaviorSubject, timer } from 'rxjs';
import { SessionOutService } from '../sessionOut/session-out.service';
@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService implements OnInit {

  accountDetails: any = new BehaviorSubject([]);

  constructor(
    private _req: ApirequestService,
    private _so: SessionOutService,
    private _url: ApiUrlService) {

  }

  ngOnInit() {

  }
  getAccountDetails() {
    this._req.fetchApiData(this._url.userAccountDetailsUrl, {}, false).subscribe(
      (data: any) => {

        let resSuss = data.data;
        let resErr = data.error;
        if (resSuss != '') {
          this.accountDetails.next(resSuss);
        }
        if (resErr != '') {
          this.accountDetails.next('error');
          this._so.handleSessionOutErr(resErr);
        }
      }
    )
  }

  userDetails(data: any) {
    return this._req.fetchPollingApiData(this._url.userDetailmainUrl, data, false);
  }

  getAccountDetailsSch() {
    return this._req.fetchApiData(this._url.userAccountDetailsUrl, {}, false);
  }


  tranxDetails: any = new BehaviorSubject([]);
  getTranxDetails() {
    this._req.fetchApiData(this._url.ledgerDetailsUrl, {}, false).subscribe(
      (data: any) => {
        let resSuss = data.data;
        let resErr = data.error;
        if (resSuss != '') {
          this.tranxDetails.next(resSuss);
        }

        if (resErr != '') {
          this.tranxDetails.next('error');
          this._so.handleSessionOutErr(resErr);
        }
      }
    )
  }

  tranxHistory: any = new BehaviorSubject([]);
  getTranxHistory() {
    this._req.fetchApiData(this._url.nemHistoryUrl, {}, false).subscribe(
      (data: any) => {
        let resSuss = data.data;
        let resErr = data.error;
        if (resSuss != '') {
          this.tranxHistory.next(resSuss);
        }

        if (resErr != '') {
          this.tranxHistory.next('error');
          this._so.handleSessionOutErr(resErr);
        }
      }
    )
  }


  activeOrder: any = new BehaviorSubject([]);
  matchedOrder: any = new BehaviorSubject([]);
  getTradeHistory(orderType: any) {
    let data = { type: orderType }
    this._req.fetchApiData(this._url.userOrderUrl, data, false).subscribe(
      (data: any) => {
        let resSuss = data.data;
        let resErr = data.error;
        if (resSuss != '') {
          (orderType == 'Active') ? this.activeOrder.next(resSuss) : this.matchedOrder.next(resSuss);
        } else {
            (orderType == 'Active') ? this.activeOrder.next([]) : this.matchedOrder.next([]);
        }

        if (resErr != '') {
          this.activeOrder.next('error');
          this.matchedOrder.next('error');
          this._so.handleSessionOutErr(resErr);
        }
      }
    )
  }

}
