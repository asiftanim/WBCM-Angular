import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  private SystemUserRoles: any = [];

  constructor(private _appAuthService: AppAuthService) { }

  ngOnInit(): void {
    this.SystemUserRoles = JSON.parse(localStorage.getItem('loggedInUserInfo')).roles;
    console.log(this.SystemUserRoles);
  }

  isMenuAccessible(menu: string) {
    var access = false;
    switch (menu) {
      case "SS":
        access = this.SystemUserRoles.find(x => x.name == 'ADM') ? true : false;
        break;
      case "UM":
        access = this.SystemUserRoles.find(x => x.name == 'ADM') ? true : false;
        break;
      case "CMA":
        access = this.SystemUserRoles.find(x => x.name == 'CMA') ? true : false;
        break;
      case "CML":
        if (this.SystemUserRoles.find(x => x.name == 'CMA')) {
          access = true;
        } else {
          access = this.SystemUserRoles.find(x => x.name == 'CML') ? true : false;
        }
        break;
    }

    return access;
    
  }

  public logout() {
    this._appAuthService.logout();
  }

}
