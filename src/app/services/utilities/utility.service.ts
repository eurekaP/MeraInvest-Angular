import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from '../crypto/crypto.service';
import { StorageService } from '../localstorage/storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UtilityService {

  constructor( private _ar: ActivatedRoute,
               private _cry: CryptoService,
               private _lstore: StorageService ) { }


  doubleWalletToggle:any = new BehaviorSubject(false);

  checkMobileDevice() {
    return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
  }


  filterArrayObj(arr: any, prop: string, val: any) {
    let filteredVal = arr.filter( (item: any) => {
      return item[prop] != val;
    });
    return filteredVal;
  }
  filteredArray(arr: any, prop: string, val: any) {
    let filteredVal = arr.filter( (item: any) => {
      return item[prop] == val;
    });
    return filteredVal;
  }

  changeArrProp(arr: any, prop: string, val: any) {
    arr.forEach( (item: any) => {
      item['availableAmount'] = Number(item.totalAmount) - Number(item.reserveAmount);
      item[prop] = val;
    });
    return arr;
  }

  filteredObj(arr: any, prop: string, val: any) {
    let filteredVal = arr.filter( (item: any) => {
      return item[prop] == val;
    });
    return filteredVal;
  }

  filteredObjOnArray(subject: any, fltr: any, prop: string, include: boolean) {
      let filteredVal = subject.filter( (item: any) => {
          if (include) {
              return fltr.includes(item[prop]);
          } else {
              return !fltr.includes(item[prop]);
          }
      });
      return filteredVal;
  }


  changeArrayObjProp(arr: any,match: string, value: string, prop: string, val: string) {
    arr.forEach(function(item: any, index: number, array: any) {
      if( item[match] == value ) item[prop] = val;
    });
    return arr;
  }

  addPropInObj(obj: any, prop: any, val: any) {
    if(obj.length > 0 ) {
      obj.forEach( (ele: any) => {
        prop.forEach((item: any, index: number) => {
          ele[item] = val[index];
        });
      });
    }
    return obj;
  }

  getPropValFromObj(obj: any, check_prop: string, prop: string, val: any) {
    let propVal = '';
    if(obj.length > 0 ) {
      obj.forEach( (ele: any) => {
        if( ele[check_prop] == val ) propVal = ele[prop];
      });
    }
    return propVal;
  }


  dynamicSort(property: any) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a: any, b: any) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }
    }
  }


  paginatedItems(arr: any, start: number, end: number) {
    return arr.slice(start,end);
  }


  compareSort(a: any, b: any, isAsc: boolean) {
    // return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    let item1 = a; let item2 = b;
    if( !isNaN(a) ) item1 = parseFloat(a);
    if( !isNaN(b) ) item2 = parseFloat(b);
    return (item1 < item2 ? -1 : 1) * (isAsc ? 1 : -1);
  }


  getFromStorage(getItem: string) {
    let storageData = this._lstore.getLocalItems(getItem);
    if(storageData != null) {
      let deCypherData = this._cry.deCypherData(storageData,'obj');
      return deCypherData;
    }
    return null;
  }

}
