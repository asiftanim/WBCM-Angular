import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIRequestModel } from '../../../models/APIRequestModel';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { SiteSetting } from '../../../models/SiteSetting';
import { AdminService } from '../../../services/AdminService';
import { FormValidationService } from '../../../services/FormValidationService';
import { GenerateToastaService } from '../../../services/GenerateToastaService';
import { FileDownloadService } from '../../../services/utility/FileDownloadService';

@Component({
  selector: 'app-admin-site-settings',
  templateUrl: './admin-site-settings.component.html',
  styleUrls: ['./admin-site-settings.component.css']
})
export class AdminSiteSettingsComponent implements OnInit {

  public _siteSetting: SiteSetting = new SiteSetting();

  // Form Valdation
  public siteSettingForm: any;
  public validatorErrorMsg: any;
  submitted = false;
  get f() { return this.siteSettingForm?.controls; }

  public _requestData: APIRequestModel = new APIRequestModel();
  public _data: APIResponseModel = new APIResponseModel();

  constructor(private _generateToasta: GenerateToastaService,
    private activatedRoute: ActivatedRoute,
    private _formValidationService: FormValidationService,
    private _fileDownloadService: FileDownloadService,
    private _adminService: AdminService) { }

  ngOnInit(): void {
    this.siteSettingForm = this._formValidationService.siteSettingFormConfig().formGroup;
    this.validatorErrorMsg = this._formValidationService.siteSettingFormConfig().formValidationErrorMsg;
    this.getSiteSettings();
  }

  public getSiteSettings() {
    this._adminService.getSiteSettings().subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this._siteSetting = JSON.parse(JSON.stringify(this._data.BusinessData));
          this.siteSettingForm.patchValue(this._siteSetting);
          this._siteSetting.logo_show = "data:image/jpeg;base64," + this._siteSetting.logo
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

  public onFileChanged(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this._siteSetting.logo_show = reader.result
      this._siteSetting.logo_file_name = files[0].name;
      this._siteSetting.logo = (reader.result as string).split(",").pop();
    }
  }

  public onSaveOrUpdate() {

    let logo_file_name = this._siteSetting.logo_file_name;
    let logo = this._siteSetting.logo;
    let logo_show = this._siteSetting.logo_show;

    this._siteSetting = this.siteSettingForm.value;
    this._siteSetting.logo_file_name = logo_file_name ? logo_file_name : '';
    this._siteSetting.logo = logo;
    this._siteSetting.logo_show = logo_show;

    //Checking Form Validation
    this.submitted = true;
    if (this.siteSettingForm.invalid) {
      return;
    }

    this._requestData.BusinessData = this._siteSetting;

    this._adminService.updateSiteSettings(this._requestData).subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this._generateToasta.showToast('success', 'Failed!', this._data.SuccessMsg);
          }
        else {
          this._generateToasta.showToast('danger', 'Failed!', "Site Setting Save Failed");
          console.log(this._data.ErrMsg)
        }
      },
      error => {
        this._generateToasta.showToast('danger', 'Failed!', "Site Setting Save Failed");
        console.log(error.message)
      },
      () => {
        // No errors, route to new page
      }
    );

  }

  saveOrUpdateEmailConfig() {

  }

  public backupDB() {
    this._adminService.backupDatabase().subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          var fileBase64 = this._data.BusinessData;
          this._fileDownloadService.downloadFile('Attachments.zip', fileBase64);
        }
        else {
          console.log(this._data.ErrMsg)
        }
      },
      error => {
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  purgeDB() {
    if (confirm('Are you sure you want to purge the database?')) {
      this._adminService.purgeDatabase().subscribe(
        response => {
          this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
          if (this._data.ResponseCode == 2000) {
            this._generateToasta.showToast('success', 'Failed!', this._data.SuccessMsg);
          }
          else {
            this._generateToasta.showToast('danger', 'Failed!', this._data.ErrMsg);
          }
        },
        error => {
        },
        () => {
          // No errors, route to new page
        }
      );
    }
  }

}
