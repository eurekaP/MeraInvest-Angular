import { Injectable } from '@angular/core';
import { ApirequestService } from '../apirequest/apirequest.service';
import { ApiUrlService } from '../api-url/api-url.service';
import { StorageService } from '../localstorage/storage.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwoFactorService {

  constructor(private _req:ApirequestService,
    private _urls: ApiUrlService,
    private _lstore:StorageService,) { }


  twoFactorData:Subject<any> = new BehaviorSubject(null);
  checkTwoFactorEnabled(email: string) {
    let data = {
      email: email
    }
    this._req.fetchApiData(this._urls.twofaEnableorNotUrl,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        let result = {};
        if(resSucc != '') {
          result = { status: true, data: resSucc}
        }
        if(resErr != '') {
          result = { status: false, data: resErr}
        }
        this.twoFactorData.next(result);
      }
    )
  }


  checkTfaCodeData:Subject<any> = new BehaviorSubject(null);
  checkCodeAtLogin(data: any) {
    this._req.fetchApiData(this._urls.verify2faAtLoginUrl,data).subscribe(
      (data:any) => {
        let resSucc = data.data;
        let resErr = data.error;
        let result = {};
        if(resSucc != '') {
          result = { status: true, data: resSucc}
        }
        if(resErr != '') {
          result = { status: false, data: resErr}
        }
        this.checkTfaCodeData.next(result);
      }
    )
  }



}
