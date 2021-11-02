import {Injectable} from '@angular/core';
import {ApirequestService} from '../apirequest/apirequest.service';
import {ApiUrlService} from '../api-url/api-url.service';
import {mergeMap} from 'rxjs/operators';
import * as Auth from '../../shared/states/authentication/auth.action';
import * as rootStore from '../../app.reducer';
import {Store} from '@ngrx/store';

import {BehaviorSubject, Subject} from 'rxjs';
import * as AuthData from '../../shared/states/auth-data/auth-data.action';
import {StorageService} from '../localstorage/storage.service';
import {CryptoService} from '../crypto/crypto.service';
import {hyb_udata, hyb_udetail, hyb_compdetail} from '../../shared/data/constant-data';
import { MatDialog } from "@angular/material/dialog";
import {ModalBoxComponent} from '../../components/widgets/modal-box/modal-box.component';
import {LogoutService} from '../logout/logout.service';
import {Router} from '@angular/router';
import {AccountDetailsService} from '../accountDetails/account-details.service';

@Injectable()
export class LoginService {
    constructor(
        private _req: ApirequestService,
        private _urls: ApiUrlService,
        private _lstore: StorageService,
        private _dialog: MatDialog,
        private _cry: CryptoService,
        private _lo: LogoutService,
        private _route: Router,
        private _acDtl: AccountDetailsService,
        // private socketService: SocketService,
        private store: Store<rootStore.State>
    ) {
    }

    isAuthenticated: any = new BehaviorSubject('');
    loginErrMsg: any = new BehaviorSubject('');
    loginStatus: any = new BehaviorSubject(null);
    showLoader: any = new Subject();
    preferredTheme: Subject<any> = new BehaviorSubject(null);

    userDetails: Subject<any> = new BehaviorSubject(null);
    loginSuccess: Subject<any> = new BehaviorSubject(null);


    companyDetails: Subject<any> = new BehaviorSubject(null);

    login(data: any) {
        this._req.fetchApiData(this._urls.loginUrl, data).subscribe(
            (data: any) => {
                const resSucc: any = data.data;
                const resError: any = data.error;
                if (resSucc !== '') {
                    this.setLoginAction(resSucc);
                    this.loginSuccess.next(true);
                }
                if (resError !== '') {
                    if (resError['ErrorNo'] !== '6') {
                        this.loginErrMsg.next(resError['Error Description']);
                    } else{
                        this.handleLoginErrAct(resError);
                    }
                }
                this.showLoader.next(false);
            },
            error => {
            },
            () => {
            }
        );
    }

    setLoginAction(resSucc: any) {
        if (resSucc.user2fa === 0 && resSucc.isActive !== 3) {
            this.saveLoginData(resSucc);
        } else {
            this.loginStatus.next(resSucc);
        }
    }

    userNewReg!: string | number;

    saveLoginData(resSucc: any) {
        // if (resSucc.idUser) {
        //   let data = {
        //     idUser: resSucc.idUser,
        //     username: resSucc.username
        //   }
        //   this.socketService.getUserWallet(data);
        // }

        const userId = resSucc.idUser;
        this.store.dispatch(new Auth.LoginAuthentication());
        this.store.dispatch(new AuthData.UserAuthenticationData(resSucc));
        const loginData = this._cry.cypherData(resSucc, 'obj');
        this._lstore.setLocalItem(hyb_udata, loginData);
        this.userNewReg = resSucc.newReg;
        this.getUserDetails(resSucc.idUser);

        const uData = {
            idUser: resSucc.idUser
        };
        // this._acDtl.userDetails(uData).subscribe((response: any) => {
        //     if (response.userWallet.length > 0) {
        //         const userWalletdata = response.userWallet;
        //         localStorage.setItem('userWalletValue', JSON.stringify(userWalletdata));
        //     }
        // });
        // if (resSucc.newReg === '0') {

        // } else {
        //   this._route.navigate(['issuerRegister', resSucc.idUser]);
        // }
    }

    handleLoginErrAct(error: any) {
        if (error['ErrorNo'] === '6' || error['Error Msg'] === 'Already logged in') {
            const dialogRef = this._dialog.open(ModalBoxComponent, {
                width: '450px',
                data: {
                    message: error['Error Description'],
                    buttonText: 'End Session'
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this._lo.logOutPrevSession(error.idUser);
                }
            });
        }
        this._lo.logOutPrevSession(error.idUser);
    }

    transferHbToBx(data: any) {
        this._req.fetchApiData(this._urls.transferUrl, data)
            .subscribe((data: any) => {
                console.log(data);
            });
    }

    getUserDetails(id?: any) {
        const data = {};
        this._req
            .fetchApiData(this._urls.userDetailsUrl, data, false)
            .subscribe((data: any) => {
                const resSucc = data.data;
                const resError = data.error;
                if (resSucc !== '') {
                    this.userDetails.next(resSucc);
                    if (resSucc.userType === 'Issuer') {
                        this.getCompanyDetails(resSucc.idCompany);
                    }
                    this.store.dispatch(new AuthData.UserAuthenticationDetails(resSucc));
                    const userDetails = this._cry.cypherData(resSucc, 'obj');
                    this._lstore.setLocalItem(hyb_udetail, userDetails);

                    let preferredTheme = resSucc.preferredTheme == true ? true : false;
                    this._lstore.setLocalItem('preferredTheme', preferredTheme);
                    this.preferredTheme.next(preferredTheme);

                    if (typeof id != 'undefined') {
                        if (resSucc.userType === 'Issuer') {
                            if (this.userNewReg == '0') {
                                this._route.navigate(['/']);
                            } else {
                                this._route.navigate(['issuerRegister', id]);
                            }
                        } else {
                          if(resSucc.isFinancialQuestion ===0){
                              this._route.navigate(['questionaire'])
                          } else{
                              if (resSucc.setupCode == 0 || resSucc.setupCode == 2) {
                                  this._route.navigate(['/']);
                              } else {
                                  this._route.navigate(['/']);
                              }
                          }
                        }
                    }
                }
            });
    }

    getUserData(id?: any) {
        const data = {};
        this._req
            .fetchApiData(this._urls.userDetailsUrl, data, false)
            .subscribe((data: any) => {
                const resSucc = data.data;
                const resError = data.error;
                if (resSucc !== '') {
                    this.userDetails.next(resSucc);
                    this.store.dispatch(new AuthData.UserAuthenticationDetails(resSucc));
                    const userDetails = this._cry.cypherData(resSucc, 'obj');
                    this._lstore.setLocalItem(hyb_udetail, userDetails);

                    let preferredTheme = resSucc.preferredTheme == true ? true : false;
                    this._lstore.setLocalItem('preferredTheme', preferredTheme);
                    this.preferredTheme.next(preferredTheme);
                }
            });
    }

    getCompanyDetails(id: any) {
        const data = {
            id: id
        };
        this._req
            .fetchApiData(this._urls.companyDetailsUrl, data, false)
            .subscribe((data: any) => {
                const resSucc = data.data;
                const resError = data.error;
                if (resSucc !== '') {
                    this.companyDetails.next(resSucc);
                    this.store.dispatch(new AuthData.IssuerCompanyDetails(resSucc));
                    const compDetails = this._cry.cypherData(resSucc, 'obj');
                    this._lstore.setLocalItem(hyb_compdetail, compDetails);
                }
            });
    }

    getAuthenticated() {
        let auth = false;
        this.store.subscribe(data => {
            auth = data.auth.isAuthenticated;
        });
        return auth;
    }
}
