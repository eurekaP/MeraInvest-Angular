import { AuthServiceConfig } from "angular-6-social-login-v2";
import { GoogleLoginProvider, FacebookLoginProvider,LinkedinLoginProvider} from "angular-6-social-login-v2";
import { environment } from '../../environments/environment';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.gOAuthKey)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fbOAuthKey)
  },
  {
    id: LinkedinLoginProvider.PROVIDER_ID,
    provider: new LinkedinLoginProvider(environment.inOAuthKey)
  }
]);

export function provideSMLConfig() {
  return config;
}

