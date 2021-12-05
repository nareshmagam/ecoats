import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginModel } from 'src/app/shared/models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  submitted: boolean = false;
  loginBO: LoginModel = new LoginModel();
  formDisabled: boolean = false;

  get f() { return this.loginForm.controls; }

  subscription$: Subscription = new Subscription();

  constructor(private _fb: FormBuilder, private _service: LoginService,
    private _toast: ToastrService, private _router: Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this._fb.group({
      emailID: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.subscription$ = this._service.subject$.subscribe(resp => {
      if (resp.purpose == "validateLogin") {
        if (resp.result == "OK") {
          this._toast.success("Successfully login");
          setTimeout(() => {
            this._router.navigate(['hr-dashboard']);
          }, 1000);
        }
        else if (resp.result == "INCORRECT_CRD")
          this._toast.error("Incorrect credentials, please try again");
        else if (resp.result == "USR_INACTIVE")
          this._toast.error("User not activated yet");
      }
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid)
      return;

    console.log(this.loginForm.value);

    this.loginBO.username = this.f.emailID.value;
    this.loginBO.password = this.f.password.value;

    this.formDisabled = true;

    this._service.validateLogin(this.loginBO).subscribe(resp => {
      
      this.formDisabled = false;

      if (resp == "OK") {
        this._toast.success("Successfully login");
        setTimeout(() => {
          this._router.navigate(['hr-dashboard']);
        }, 1000);
      }
      else if (resp == "INCORRECT_CRD")
        this._toast.error("Incorrect credentials, please try again");
      else if (resp == "USR_INACTIVE")
        this._toast.error("User not activated yet");
    }, (err) => {
      this.formDisabled = false;
      console.log(err);
    });

  }



}
