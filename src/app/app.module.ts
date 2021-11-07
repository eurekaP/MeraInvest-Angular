import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { MissingTranslationHandler } from "@ngx-translate/core";
import { translationInitializer, createTranslationLoader, MissingTranslationHelper } from "./helper/translator-helper";
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";

import { BatpConfig } from "./config/batp.config";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ModalBoxComponent } from "./components/widgets/modal-box/modal-box.component";

import { batpReducers } from "./app.reducer";

import { ApiUrlService } from "./services/api-url/api-url.service";
import { ApirequestService } from "./services/apirequest/apirequest.service";
import { ApiserviceService } from "./services/apiservice/apiservice.service";
import { StorageService } from "./services/localstorage/storage.service";
import { UtilityService } from "./services/utilities/utility.service";
import { CryptoService } from "./services/crypto/crypto.service";
import { TranslationService } from "./services/translation/translation.service";
import { TwoFactorService } from "./services/twoFactor/two-factor.service";
import { LoginService } from "./services/login/login.service";
import { LogoutService } from "./services/logout/logout.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    ModalBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslationLoader),
        deps: [HttpClient]
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationHelper},
    }),
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(batpReducers),
    NgbModule,
  ],
  providers: [
    BatpConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: translationInitializer,
      deps: [TranslationService],
      multi: true
    },
    ApiUrlService,
    ApirequestService,
    ApiserviceService,
    StorageService,
    UtilityService,
    CryptoService,
    TwoFactorService,
    LoginService,
    LogoutService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
