import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { CaseService } from '../../../services/CaseService';
import { AdminService } from '../../../services/AdminService';
import { AppAuthService } from '../../../services/auth/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Case } from '../../../models/Case';
import { GenerateToastaService } from '../../../services/GenerateToastaService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SystemUser } from '../../../models/SystemUser';
import { LoginResponse } from '../../../models/LoginResponse';

@Component({
  selector: 'app-admin-my-case-management',
  templateUrl: './admin-my-case-management.component.html',
  styleUrls: ['./admin-my-case-management.component.css']
})
export class AdminMyCaseManagementComponent implements OnInit {

  public tableData: any;
  public row: any;
  SelectionType = SelectionType
  public _data: APIResponseModel = new APIResponseModel();
  selected: Array<Case> = [];
  selectedIds: Array<string> = [];
  systemUsers: Array<SystemUser> = [];
  selectedUser: string = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
      private _caseService: CaseService,
      private _adminService: AdminService,
      private _authService: AppAuthService,
      private ngxService: NgxUiLoaderService,
      private _generateToasta: GenerateToastaService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    var user = JSON.parse(localStorage.getItem('loggedInUserInfo'));
    this.ngxService.start();
    this._caseService.getAllCasesByUserId(user.user_id).subscribe(response => {
      this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
      this.ngxService.stop();
      if (this._data.ResponseCode == 2000) {
        this.tableData = JSON.parse(JSON.stringify(this._data.BusinessData));
        this.row = this.tableData;
      }
    })
  }

  setPage(pageInfo: any) {
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  getSelectedIds() {
    this.selectedIds = [];
    this.selected.forEach((item) => {
      this.selectedIds.push(item.id);
    });
  }

  setCaseStatus(actionType: string) {

    if (this.selected.length > 0) {
      this.getSelectedIds();

      var requestData = {
        SelectedIds: this.selectedIds,
        ActionType: actionType
      }

      this.ngxService.start();
      this._caseService.setCaseStatusAsFake(requestData).subscribe(response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        this.ngxService.stop();
        if (this._data.ResponseCode == 2000) {
          this._generateToasta.showToast('success', 'Success!', JSON.parse(JSON.stringify(this._data.SuccessMsg)));
          this.tableData = JSON.parse(JSON.stringify(this._data.BusinessData));
          this.row = this.tableData;
          this.selectedIds = [];
          this.selected = [];
        } else {
          this._generateToasta.showToast('success', 'Success!', JSON.parse(JSON.stringify(this._data.ErrMsg)));
        }
      });
    } else {
      alert("Please select a case first !!!")
    }
    
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tableData.filter(function (d) {
      return d.id.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.row = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
