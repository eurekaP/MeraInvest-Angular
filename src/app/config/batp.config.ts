import { environment } from '../../environments/environment';

export class BatpConfig {
  // real-estate
  apiURL:string = 'https://geapi.business-software.in/api/';
  authURL: string = 'https://geauth.business-software.in/api/';
  pollingURL:string = `https://gews.business-software.in/polling`;
  chartURL:string = 'https://batpv3.business-software.in/statistics/';

  // prod url
    kycURL = `https://hybseapi.knowmenow.com/api/v1/`;
}

export const fsKey: string = environment.fsKey;

export const devEnv: boolean = environment.production ? false : true;

export const captchaKey: string = environment.captchaKey;

export const nemApiUrl: string = environment.nemApiUrls;

export const batp_versionNo = '3.0.1';

export const batp_buildNo = '219461';
