import { Injectable } from '@angular/core';
import { ApiserviceService } from '../apiservice/apiservice.service';
import { forkJoin } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class ApirequestService {

  constructor(private api: ApiserviceService, private _http: HttpClient) { }
  fetchApiData(url: string, data: any = {}, publicApi: boolean = true, type = 'post') {
    return (type === 'post') ? this.api.postApiData(url, data, publicApi) :
      this.api.getApiData(url, data, publicApi);
  }

  fetchPollingApiData(url: string, data: any, publicApi: boolean = true, type = 'post') {
    return (type === 'post') ? this.api.pollingPostApiData(url, data, publicApi) :
      this.api.getApiData(url, data, publicApi);
  }
  public getKYCToken(url: string, data: any) {
    return this._http.post<any>(url, data);
  }

  public getQRCode(url: string, data: any, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this._http.post<any>(url, data,  {headers} );
  }
  public fetchPost(url: string, data: any, token: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this._http.post<any>(url, data,  {headers} );
  }

  forkJoinReq(...apis: any) {
    return forkJoin(...apis);
  }
}
