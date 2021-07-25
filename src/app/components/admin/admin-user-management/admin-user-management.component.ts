import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { debug } from 'console';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { APIRequestModel } from '../../../models/APIRequestModel';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { Role } from '../../../models/Role';
import { SystemUser } from '../../../models/SystemUser';
import { UserRole } from '../../../models/UserRole';
import { AdminService } from '../../../services/AdminService';
import { CaseService } from '../../../services/CaseService';
import { FormValidationService } from '../../../services/FormValidationService';
import { GenerateToastaService } from '../../../services/GenerateToastaService';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {

  // Form Valdation
  public addUserFormGroup: FormGroup;
  public validatorErrorMsg: any;
  submitted = false;


  // Form Valdation resetPassword
  public resetPasssForm: FormGroup;
  public resetPasssvalidatorErrorMsg: any;
  resetPasssubmitted = false;

  public _requestData: APIRequestModel = new APIRequestModel();
  public _data: APIResponseModel = new APIResponseModel();

  public dummyData: any;
  public closeResult: string ="";

  public allRoles: Role[] = []
  public selectedRoles: Role[] = []
  public systemUserRoles: UserRole[] = []
  public sytemUser: SystemUser = new SystemUser();
  public sytemUserList: SystemUser[] = [];

  //Multiselect Dropdown
  dropdownList = [];
  selectedItems: any = [];
  dropdownSettings = {};


  public userActionType: string = ''

  constructor(private modalService: NgbModal,
    private ngxService: NgxUiLoaderService,
    private _generateToasta: GenerateToastaService,
    private _formValidationService: FormValidationService,
    private activatedRoute: ActivatedRoute,
    private _adminService: AdminService,
    private _caseService: CaseService,
    private router: Router) { }

  ngOnInit(): void {
    this.addUserFormGroup = this._formValidationService.getAddUserConfig().formGroup;
    this.validatorErrorMsg = this._formValidationService.getAddUserConfig().formValidationErrorMsg;

    this.resetPasssForm = this._formValidationService.resetPasswordUser().formGroup;
    this.resetPasssvalidatorErrorMsg = this._formValidationService.resetPasswordUser().formValidationErrorMsg;

    this.getAllRoles();
    this.configDropdown();
    this.getUserList();
  }

  get f() { return this.addUserFormGroup?.controls; }
  get resetPasss() { return this.resetPasssForm?.controls; }

  setPage(pageInfo: any) {
  }

  public addNewUserModal(content: any, actionType = null, userId = null) {
    this.userActionType = actionType;
    this.addUserFormGroup.reset();

    if (this.userActionType == 'edit') {
      this.getUserRolesAndEdit(userId);
      this.addUserFormGroup.controls.password.setValidators(null);
      this.addUserFormGroup.controls.password.updateValueAndValidity();
    }

    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {
    }, (reason) => {
    });
  }

  public passwordResetModal(content: any, userId) {
    this.resetPasssForm.patchValue({ id: userId })
    this.modalService.open(content, { size: 'md', centered: true }).result.then((result) => {
    }, (reason) => {
    });
  }

  public getUserRolesAndEdit(userId: string) {
    let userRoles: UserRole[] = this.systemUserRoles.filter(x => x.user_id == userId);
    let userToEdit = this.sytemUserList.find(x => x.id == userId);

    let allRoles = JSON.parse(JSON.stringify(this.allRoles));
    let selectRoles: Role[] = []
    userRoles.forEach(x => {
      let foundRoles = allRoles.find(r => r.id == x.role_id);
      if (foundRoles) {
        selectRoles.push(foundRoles);
      }
    })

    this.addUserFormGroup.patchValue(userToEdit);
    this.addUserFormGroup.patchValue({ role: selectRoles })
    this.selectedRoles = selectRoles;

  }

  public getAllRoles() {
    this._adminService.getAllRoles().subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this.allRoles = JSON.parse(JSON.stringify(this._data.BusinessData))
        }
        else {
          this._generateToasta.showToast('danger', 'Failed!', "Can't Fetch Roles!");
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

  onItemSelect(item: any) {
    this.selectedRoles.push(item);
    console.log(this.selectedRoles);
  }

  onSelectAll(items: any) {
    this.selectedRoles.push(items);
  }

  public onDeSelect(item: any) {
    var selected = this.selectedRoles.find(x => x.id = item.id)
    var index = this.selectedRoles.indexOf(selected);
    if (index !== -1) {
      this.selectedRoles.splice(index, 1);
    }
    console.log(this.selectedRoles);
  }

  public onDeSelectAll(items: any) {
    this.selectedRoles = [];
  }

  configDropdown() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  public onSaveOrUpdateUser() {

    //Checking Form Validation
    this.submitted = true;
    if (this.addUserFormGroup.invalid) {
      return;
    }
    this.sytemUser = this.addUserFormGroup.value
    this._requestData.BusinessData = this.addUserFormGroup.value

    this._adminService.createUpdateUser(this._requestData).subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this.modalService.dismissAll();
          let userData = JSON.parse(JSON.stringify(this._data.BusinessData));
          this.sytemUserList = userData['users'];
          this.systemUserRoles = userData['roles'];
          this.addUserFormGroup.reset();
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

  public getUserList() {
    this._adminService.getAllUsers().subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          let userData = JSON.parse(JSON.stringify(this._data.BusinessData))
          this.sytemUserList = userData['users'];
          this.systemUserRoles = userData['roles'];
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

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
  }

  public changeCaseStatus(event, userId) {
    this._adminService.changeUserStatus(userId).subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this._generateToasta.showToast('success', 'Failed!', this._data.SuccessMsg);
        }
        else {
          this.rollbackCaseStatus(event, userId);
          this._generateToasta.showToast('danger', 'Failed!', "Can't change User Status!");
        }
      },
      error => {
        this.rollbackCaseStatus(event, userId);
        this._generateToasta.showToast('danger', 'Failed!', error.message);
      },
      () => {
        // No errors, route to new page
      }
    );

  }

  rollbackCaseStatus(event, userId) {

    let user = this.sytemUserList.find(x => x.id == userId);
    let index = this.sytemUserList.indexOf(user);
    if (event == true) {
      this.sytemUserList[index].status = false;
    } else {
      this.sytemUserList[index].status = true;
    }

  }

  public onResetPassword() {
    this.resetPasssubmitted = true;
    if (this.resetPasssForm.invalid) {
      return;
    }

    let systemuserResetPass: SystemUser = new SystemUser();
    systemuserResetPass = this.resetPasssForm.value
    this._requestData.BusinessData = systemuserResetPass


    this._adminService.resetUserPassword(this._requestData).subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this.modalService.dismissAll();
          this.resetPasssForm.reset();
          this.resetPasssubmitted = false;
          this._generateToasta.showToast('success', 'Success!', this._data.SuccessMsg);
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
