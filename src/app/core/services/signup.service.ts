import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  subject$: Subject<any> = new Subject();

  constructor(private _http: HttpClient) { }

  registraion(payload) {
    // this._http.post(environment.baseUrl + 'register-new-user', payload).subscribe(resp => {
    //   this.subject$.next({ purpose: "registration", result: resp });
    // })
    return this._http.post(environment.baseUrl + 'register-new-user', payload);
  }
}
