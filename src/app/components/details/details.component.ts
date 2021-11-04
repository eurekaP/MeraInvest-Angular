import { Component, OnInit } from '@angular/core';
import {ApiUrlService} from "../../services/api-url/api-url.service";
import {ApirequestService} from "../../services/apirequest/apirequest.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public assetData: any;
  public resImage: any[] = [];
  public id = 0;

  constructor(
    private _url: ApiUrlService,
    private _req: ApirequestService,
    private _route: Router,
    private _ac: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._ac.params.subscribe(
      params => {
        this.id = params.id;
        this.getAssetData();
      }
    )
  }

  getAssetData() {
    let data = {
      idCompany: this.id
    }
    this._req.fetchApiData(this._url.propertDetailUrl, data).subscribe(
      (data: any) => {
        this.assetData = data.data;
        this.assetData.companyDocument.forEach((data: any) => {
          if (data.docType === 5) {
            this.resImage.push(data)
          }
        })
      },
      error => {

      },
      () => {

      }
    )
  }

}
