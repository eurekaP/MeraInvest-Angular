import { Injectable } from '@angular/core';
import * as tony from 'crypto-js';
import { hyb_jarvis } from '../../shared/piece/jarvis';
import { hyb_friday } from '../../shared/data/friday';
import { hyb_stark } from '../../shared/states/stark';


@Injectable()
export class CryptoService {

  constructor() {
    // var CryptoJSAesJson = {
    //   stringify: function (cipherParams) {
    //     var j:any = {ct: cipherParams.ciphertext.toString(tony.enc.Base64)};
    //     if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    //     if (cipherParams.salt) j.s = cipherParams.salt.toString();
    //     return JSON.stringify(j);
    //   },
    //   parse: function (jsonStr) {
    //     var j = JSON.parse(jsonStr);
    //     var cipherParams = tony.lib.CipherParams.create({ciphertext: tony.enc.Base64.parse(j.ct)});
    //     if (j.iv) cipherParams.iv = tony.enc.Hex.parse(j.iv)
    //     if (j.s) cipherParams.salt = tony.enc.Hex.parse(j.s)
    //     return cipherParams;
    //   }
    // }
    // var encrypted = tony.AES.encrypt(JSON.stringify("$apiPrivateKey"), "HBIN-10", {format: CryptoJSAesJson}).toString();
    // var decrypted = JSON.parse(tony.AES.decrypt(encrypted, "HBIN-10", {format: CryptoJSAesJson}).toString(tony.enc.Utf8));
    // console.log('dec',decrypted);


    // let dec = tony.AES.decrypt('U2FsdGVkX19F0G9eFff+At49cs4fY1VV4diy5LUdU6qrQ8q/+YLQQP7wj6ADw6U2d3cQGQ0NjWZSyKacCOmuTplP52wNdLODWh1MMPNJ5SHMVzNB29zzOfMGOfdQoElqvRVmFD+vYeXl9X32sCjkxUFIhROvlQ+/j1nxJxQpUIznLwZC3W7+yQKTboPbp7c8+bOJ7rUN1jzDlQ2+It07dW7CSUPu235OWuNeKnDEhNM=','HBIN-98.103.231.217.50');

  }

  cypherData(data: any , type: any) {
    let cypher = tony.AES.encrypt( (type == 'string') ? data : JSON.stringify(data), hyb_jarvis + hyb_friday + hyb_stark );
    return cypher.toString();
  }
  deCypherData(data: any, type: any,password = '') {

    try{
      let pass = password ? password : hyb_jarvis + hyb_friday + hyb_stark;
      let bytes  = tony.AES.decrypt(data, pass);
      let decryptedData = (type == 'string') ? bytes.toString(tony.enc.Utf8) : JSON.parse(bytes.toString(tony.enc.Utf8));
      return decryptedData;
    } catch(err) {
      return 'error';
    }

  }


}
