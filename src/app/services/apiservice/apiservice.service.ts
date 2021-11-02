import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../localstorage/storage.service';
import { UtilityService } from '../utilities/utility.service';
import { hyb_udata } from '../../shared/data/constant-data';

@Injectable()
export class ApiserviceService {
  public postPollingData = {}

  constructor(public _http: HttpClient,
    private _utils: UtilityService,
    private _ls: StorageService) { }
  getApiData(url: any, jsonData: any = {}, publicApi: boolean = false) {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');
    let ls = this._utils.getFromStorage(hyb_udata);
    if (!publicApi) {
      if (ls != null) {
        jsonData.idUser = ls.idUser;
        jsonData.publicKey = ls.Key.publicKey;
        jsonData.sessionKey = ls.Key.sessionKey;
        return this._http.get(url, jsonData);
      } else {
        return this._http.get('');
      }
    } else {
      return this._http.get(url);
    }
  }

  postApiData(url: any, jsonData: any = {}, publicApi: boolean = false) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let ls = this._utils.getFromStorage(hyb_udata);
    if (!publicApi) {
      if (ls != null) {
        jsonData.idUser = ls.idUser;
        jsonData.publicKey = ls.Key.publicKey;
        jsonData.sessionKey = ls.Key.sessionKey;
        return this._http.post(url, jsonData);
      } else {
        return this._http.get('');
      }
    } else {
      return this._http.post(url, jsonData);
    }
  }


  pollingPostApiData(url: any, jsonData: any = {}, publicApi: boolean = false) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    let ls = this._utils.getFromStorage(hyb_udata);
    if (!publicApi) {
      if (ls !== null) {
        if (typeof ls.idUser !== 'undefined' && jsonData.idCompanyStock) {
          this.postPollingData = "idCompanyStock=" + jsonData.idCompanyStock + "&idUser=" + ls.idUser
        } else if (typeof ls.idUser !== 'undefined') {
          this.postPollingData = `idUser=${jsonData.idUser}`;
        } else if (jsonData.idCompanyStock) {
          this.postPollingData = "idCompanyStock=" + jsonData.idCompanyStock;
        }
      } else {
        this.postPollingData = "idCompanyStock=" + jsonData.idCompanyStock;
      }

      return this._http.post(url, this.postPollingData, httpOptions);

      // if (jsonData.idUser) {
      //   this.postPollingData = `idUser=${jsonData.idUser}`;
      // } else {
      //   if (jsonData.idCompanyStock && jsonData.idUser) {

      //     this.postPollingData = "idCompanyStock=" + jsonData.idCompanyStock + "&idUser=" + ls.idUser
      //   } else {
      //     this.postPollingData = "idCompanyStock=" + jsonData.idCompanyStock
      //   }
      // }

    } else {
      return this._http.post(url, jsonData, httpOptions);
    }
  }

  postUpload(url: any, data?: any) {
    return this._http.post(url, data, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
