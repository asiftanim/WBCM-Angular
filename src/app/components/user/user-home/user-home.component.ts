import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { CaseService } from '../../../services/CaseService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(
    private _caseService: CaseService,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) { }

  public secrectKey: string = "";
  public _data: APIResponseModel = new APIResponseModel();

  ngOnInit(): void {
  }

  getCaseId() {
    this.ngxService.start();
    this._caseService.getCaseIdBySecrectKey(this.secrectKey).subscribe((response) => {

      this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
      this.ngxService.stop();

      if (this._data.ResponseCode == 2000) {
        var caseId = JSON.parse(JSON.stringify(this._data.BusinessData));
        this.router.navigateByUrl('/case/' + caseId + '/edit');
      }

    });
  }
}
