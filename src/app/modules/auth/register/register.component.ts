import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Subscription } from 'rxjs';
import { OrgDetailsModel, SignupModel } from 'src/app/shared/models/signup.model';
import { MustMatch } from 'src/app/shared/utilities/must-match.validator';
import { UtilSerrvice } from 'src/app/shared/utilities/util.service';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/core/services/signup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class RegisterComponent extends UtilSerrvice implements OnInit {

  registrationForm: FormGroup;
  submitted: boolean = false;
  isShowPass: boolean = false;
  isShowConfirmPass: boolean = false;

  regBO: SignupModel = new SignupModel();

  get f() { return this.registrationForm.controls; }

  disabledForm: boolean = false;
  geneateUniqNo: number;

  subscription$: Subscription = new Subscription();

  constructor(private _fb: FormBuilder, private _service: SignupService,
    private _toast: ToastrService) {

    super()

    this.uniqueNum();

    // Creating Form
    this.createForm();

    this.f.captcha.valueChanges.subscribe(resp => {
      console.log(resp);
      if (!resp)
        this.f.captcha.setErrors({ 'required': true }, { emitEvent: false });
      else if (resp != this.geneateUniqNo)
        this.f.captcha.setErrors({ 'noMatch': true }, { emitEvent: false });
      else
        this.f.captcha.setErrors(null);
    })
  }

  ngOnInit(): void {

    console.log(Math.floor(100000 + Math.random() * 900000));

    this.subscription$ = this._service.subject$.subscribe(resp => {
      if (resp.purpose == "registration") {
        if (resp.result == "ACT_LINK_OK")
          this._toast.success("Successfully registered, please check register official email id");
        else if (resp.result == "EMAIL_ID_DUP")
          this._toast.error("Official email id already exists, please proceed with another one");
        else if (resp.result == "PHONE_NUM_DUP")
          this._toast.error("Mobile number already exists, please proceed with another one");
      }
    })
  }

  createForm() {

    this.registrationForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(150)]],
      middleName: ['', [Validators.maxLength(150)]],
      lastName: ['', [Validators.required, Validators.maxLength(150)]],
      emailID: ['', [Validators.required, Validators.maxLength(150), Validators.email]],
      orgName: ['', [Validators.required, Validators.maxLength(250)]],
      orgPhone: ['', [Validators.required, Validators.maxLength(15)]],
      address_1: ['', [Validators.required, Validators.maxLength(250)]],
      address_2: ['', Validators.maxLength(250)],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      state: ['', [Validators.required, Validators.maxLength(100)]],
      zip: ['', [Validators.required, Validators.maxLength(15)]],
      country: ['', [Validators.required, Validators.maxLength(150)]],
      phone: ['', [Validators.required, Validators.maxLength(15)]],
      fax: ['', Validators.maxLength(15)],
      createPassword: ['', [Validators.required, Validators.maxLength(250)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(250)]],
      captcha: ['', [Validators.required]],
      agree: ['', [Validators.required]]
    }, {
      validator: MustMatch('createPassword', 'confirmPassword')
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.regBO.firstName = this.f.firstName.value;
    this.regBO.middleName = this.f.middleName.value;
    this.regBO.lastName = this.f.lastName.value;
    this.regBO.emailAddress = this.f.emailID.value;
    this.regBO.phNum = this.f.phone.value;

    this.regBO.orgDetails = new OrgDetailsModel();
    this.regBO.orgDetails.orgName = this.f.orgName.value;
    this.regBO.orgDetails.orgPh = this.f.orgPhone.value;
    this.regBO.orgDetails.orgAddr1 = this.f.address_1.value;
    this.regBO.orgDetails.orgAdd2 = this.f.address_2.value;
    this.regBO.orgDetails.city = this.f.city.value;
    this.regBO.orgDetails.state = this.f.state.value;
    this.regBO.orgDetails.zip = this.f.zip.value;
    this.regBO.orgDetails.country = this.f.country.value;
    this.regBO.orgDetails.orgFax = this.f.fax.value;
    this.regBO.password = this.f.createPassword.value;

    this.disabledForm = true;

    this._service.registraion(this.regBO).subscribe((resp: any) => {
      this.disabledForm = false;

      if (resp.message == "ACT_LINK_OK") {
        this.uniqueNum();
        this.regBO = new SignupModel();
        this.registrationForm.reset();
        this.submitted = false;
        this._toast.success("Successfully registered, please check register official email id");
      }
      else if (resp.message == "EMAIL_ID_DUP")
        this._toast.error("Official email id already exists, please proceed with another one");
      else if (resp.message == "PHONE_NUM_DUP")
        this._toast.error("Mobile number already exists, please proceed with another one");

    }, (error) => {
      console.log(error);
      this._toast.error("Something went wrong, please try again");
      this.disabledForm = false;
    });

  }

  pwdShowHide() {
    console.log(this.isShowPass);

    this.isShowPass = !this.isShowPass;

    console.log(this.isShowPass);
  }

  uniqueNum() {
    this.geneateUniqNo = Math.floor(100000 + Math.random() * 900000);
  }


}
