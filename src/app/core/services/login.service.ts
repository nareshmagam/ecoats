import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoginModel } from 'src/app/shared/models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  subject$: Subject<any> = new Subject();

  constructor(private _http: HttpClient) { }

  validateLogin(payload: LoginModel) {
    // this._http.post(environment.baseUrl + 'validateLogin', payload).subscribe(resp => {
    //   this.subject$.next({ purpose: "validateLogin", result: resp });
    // })

    return this._http.post(environment.baseUrl + 'validateLogin', payload);
  }

  usrActivation(key: string) {
    return this._http.get(`${environment.baseUrl}usrActivation?key= ${key}`);
  }

}
