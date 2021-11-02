import {TranslationService} from "../services/translation/translation.service";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MissingTranslationHandler, MissingTranslationHandlerParams} from "@ngx-translate/core";

export function translationInitializer(translationService: TranslationService) {
  return function () {
    return translationService.init('en');
  }
}

export function createTranslationLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export class MissingTranslationHelper implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams) {
    if (params.interpolateParams) {
      const paramKeys = Object.keys(params.interpolateParams);
      const paramVal = Object.values(params.interpolateParams);

      for (let i = 0; i < paramKeys.length; i++) {
        if (paramKeys[i] === 'default') {
          return paramVal[i] || params.key;
        }
      }
    }
    return params.key;
  }
}
