import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CaseReply } from '../models/CaseReply';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  baseUrl = environment.APIBaseURL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json', 'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  getAllRoles() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/get-all-roles",options);
  }

  createUpdateUser(busData) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "admin/create-user", busData, options);
  }

  getAllUsers() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/user-list", options);
  }

  getActiveCaseUsers() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/get-active-case-users", options);
  }

  changeUserStatus(userId: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/change-user-status/" + userId, options);
  }

  resetUserPassword(busData) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "admin/reset-user-pass", busData, options);
  }

  getUserRoles(userId: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/get-user-roles/" + userId, options);
  }

  adminLogin(busData) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "admin/login", busData, options);
  }

  getSiteSettings() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/get-site-setting", options);
  }

  getSiteName() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/get-site-name", options);
  }

  updateSiteSettings(busData) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "admin/update-site-setting", busData, options);
  }

  backupDatabase() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "admin/donwload-backup", options);
  }

  purgeDatabase() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "case/purge-database", options);
  }

}
