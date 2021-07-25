import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public SystemUser: any = [];
  public SystemUserRoles: any = [];

  constructor() { }

  ngOnInit(): void {
    this.SystemUser = JSON.parse(localStorage.getItem('loggedInUserInfo'));
    this.SystemUserRoles = this.SystemUser.roles;
    console.log(this.SystemUser)
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

}
