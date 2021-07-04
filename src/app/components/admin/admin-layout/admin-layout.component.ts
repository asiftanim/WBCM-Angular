import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private _appAuthService: AppAuthService) { }

  ngOnInit(): void {
  }

  public logout() {
    this._appAuthService.logout();
  }

}
