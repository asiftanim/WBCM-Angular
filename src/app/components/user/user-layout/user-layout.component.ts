import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { SiteSetting } from '../../../models/SiteSetting';
import { AdminService } from '../../../services/AdminService';

@Component({
  selector: 'app-admin-home',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  public _siteSetting: SiteSetting = new SiteSetting();
  public _data: APIResponseModel = new APIResponseModel();

  constructor(private _adminService: AdminService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  aboutUs() {
    this._adminService.getSiteSettings().subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this._siteSetting = JSON.parse(JSON.stringify(this._data.BusinessData));
          console.log(this._siteSetting);
          
        }
      }
    );
  }

}
