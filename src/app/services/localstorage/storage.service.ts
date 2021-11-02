import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }
  getLocalItems(key: string) {
    let val = localStorage.getItem(key);
    return val;
  }

  setLocalItem(key: string,val: any) {
    let value = ( typeof val === 'object' ) ? JSON.stringify(val) : val;
    localStorage.setItem(key,value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearStorage() {
    localStorage.clear();
  }
}
