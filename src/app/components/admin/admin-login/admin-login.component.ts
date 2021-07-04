import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIRequestModel } from '../../../models/APIRequestModel';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { LoginModel } from '../../../models/LoginModel';
import { LoginResponse } from '../../../models/LoginResponse';
import { AdminService } from '../../../services/AdminService';
import { AppAuthService } from '../../../services/auth/auth.service';
import { FormValidationService } from '../../../services/FormValidationService';
import { GenerateToastaService } from '../../../services/GenerateToastaService';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public _loginModel: LoginModel = new LoginModel();
  public _loginResponseModel: LoginResponse = new LoginResponse();


  public _requestData: APIRequestModel = new APIRequestModel();
  public _data: APIResponseModel = new APIResponseModel();

  // Form Valdation
  public loginForm: any;
  public validatorErrorMsg: any;
  submitted = false;
  get f() { return this.loginForm?.controls; }

  constructor(private route: ActivatedRoute,
    private _adminService: AdminService,
    private _appAuthService: AppAuthService,
    private _formValidationService: FormValidationService,
    private _generateToasta: GenerateToastaService,
    private activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._formValidationService.loginFormConfig().formGroup;
    this.validatorErrorMsg = this._formValidationService.loginFormConfig().formValidationErrorMsg;
  }

  public onLogin() {

    this._loginModel = this.loginForm.value;

    //Checking Form Validation
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this._requestData.BusinessData = this._loginModel;

    this._adminService.adminLogin(this._requestData).subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          let loginResponse = JSON.parse(JSON.stringify(this._data.BusinessData))
          this._appAuthService.completeAuthentication(loginResponse);
          this._appAuthService.navigateToHomePage();
          this._generateToasta.showToast('success', 'Success!', "Login Successfull!");
        }
        else {
          this._generateToasta.showToast('danger', 'Failed!', this._data.ErrMsg);
        }
      },
      error => {
        this._generateToasta.showToast('danger', 'Failed!', error.message);
      },
      () => {
        // No errors, route to new page
      }
    );

  }

}
