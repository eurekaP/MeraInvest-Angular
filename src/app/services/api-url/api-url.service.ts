import { Injectable } from '@angular/core';
import { BatpConfig } from '../../config/batp.config';

@Injectable()
export class ApiUrlService {

  constructor(public config: BatpConfig) {

  }

  /* Login Urls */
  // loginUrl: string = this.config.apiURL + 'userLogin';
  loginUrl: string = this.config.authURL + 'userLogin';

  /* User Details */
  // userDetailsUrl: string = this.config.apiURL + 'userDetails';
  userDetailsUrl: string = this.config.apiURL + 'userInfo';
  companyDetailsUrl: string = this.config.apiURL + 'companyDetail';


  /* User Account Details */
  userAccountDetailsUrl: string = this.config.apiURL + 'userAccountDetails';
  ledgerDetailsUrl: string = this.config.apiURL + 'ledgerDetails';

  userDetailmainUrl: string = this.config.pollingURL;


  /* Google Two Factor Authentication */
  twofaEnableorNotUrl: string = this.config.apiURL + 'twofaEnableorNot';
  verify2faAtLoginUrl: string = this.config.apiURL + 'verify2faAtLogin';

  /* Transaction History */
  nemHistoryUrl: string = this.config.apiURL + 'nemHistoryList';

  /* Active and Matched Orders */
  userOrderUrl: string = this.config.apiURL + 'userOrder';

  /* Properties items*/
  propertyListUrl: string = this.config.apiURL + 'propertyList';
  propertDetailUrl: string = this.config.apiURL + 'propertyDetail';

  /*Log Out */
  logoutUrl: string = this.config.apiURL + 'Logout';
  logoutPreviousSessionUrl: string = this.config.apiURL + 'logoutPreviousSession';
  isUserLogin: string = this.config.authURL + 'isUserLogin';

  /* Transfer from HYBSE to BEX */
  transferUrl: string = this.config.apiURL + 'transferAssets';
}
