import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit, AfterViewInit {

  usrKey: string;

  constructor(private _service: LoginService, private _router: Router,
    private _actRoute: ActivatedRoute, private _alert: ToastrService) { }

  ngOnInit() {
    this._actRoute.queryParams.subscribe(param => this.usrKey = param['key'])
  }

  ngAfterViewInit() {
    console.log(this.usrKey);

    this._service.usrActivation(this.usrKey).subscribe(resp => {
      if (resp == "OK") {
        this._alert.success("Successfully user activated");
        this._router.navigate(['login']);
      }
      // else if (resp == "") 

    }, (error) => {
      this._router.navigate(['error-500']);
    })
  }

}
