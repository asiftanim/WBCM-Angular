import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../../models/LoginResponse';
import { SystemUser } from '../../models/SystemUser';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  public _userModel: LoginResponse;
  public _loginResponse: LoginResponse = new LoginResponse();

  constructor(private http: HttpClient,
    private _router: Router) {
    this._userModel = new LoginResponse();
  }

  async completeAuthentication(loginResponse) {
    this._loginResponse = this.getDecodedAccessToken(loginResponse.access);
    if (this._loginResponse) {
      debugger;
      localStorage.setItem('isUserLoggedIn', "true");
      localStorage.setItem('jwtToken', loginResponse.access);
      sessionStorage.setItem('jwtRefreshToken', loginResponse.refresh);
      localStorage.setItem('loggedInUserInfo', JSON.stringify(this._loginResponse));
    }
  }

  public getLoggedUserInfo(): LoginResponse {
    this._userModel = JSON.parse(JSON.stringify(localStorage.getItem('loggedInUserInfo')));
    return this._userModel;
  }


  public isAuthenticated(): boolean {
    return (localStorage.getItem('isUserLoggedIn') == "true" ? true : false);
  }

  public getJWTToken(): string {
    let jwtToken = localStorage.getItem('jwtToken');
    return jwtToken;
  }

  public logout() {
    localStorage.clear();
    localStorage.clear();
    this._router.navigate(['/admin']);
  }

  public login() {
    this._router.navigate(['/admin']);
  }

  public navigateToHomePage() {
    this._router.navigate(['/admin/home']);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode<LoginResponse>(token);
    }
    catch (Error) {
      return null;
    }
  }

}

