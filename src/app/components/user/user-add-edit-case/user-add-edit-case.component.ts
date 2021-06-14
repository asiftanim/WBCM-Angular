import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {v4 as uuidv4} from 'uuid';
import { APIRequestModel } from '../../../models/APIRequestModel';
import { APIResponseModel } from '../../../models/APIResponseModel';
import { Case } from '../../../models/Case';
import { CaseAttachment } from '../../../models/CaseAttachment';
import { CaseService } from '../../../services/CaseService';
import { FormValidationService } from '../../../services/FormValidationService';
import { GenerateToastaService } from '../../../services/GenerateToastaService';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-add-edit-case',
  templateUrl: './user-add-edit-case.component.html',
  styleUrls: ['./user-add-edit-case.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAddEditCaseComponent implements OnInit {

  mode = '';
  uuid: any;


  @ViewChild('content', { static: false }) private content: any;

  public _requestData: APIRequestModel = new APIRequestModel();
  public _data: APIResponseModel = new APIResponseModel();

  public _caseModel: Case = new Case();
  public _caseArrachmentModelModel: CaseAttachment[] = [];

  // Form Valdation
  public caseCreateForm: any;
  public validatorErrorMsg: any;
  submitted = false;
  get f() { return this.caseCreateForm?.controls; }

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              private _caseService: CaseService,
    private _formValidationService: FormValidationService,
    private ngxService: NgxUiLoaderService,
    private _generateToasta: GenerateToastaService) {
  }

  ngOnInit(): void {
    this.caseCreateForm = this._formValidationService.getCaseCreateConfig().formGroup;
    this.validatorErrorMsg = this._formValidationService.getCaseCreateConfig().formValidationErrorMsg;

    this.caseCreateForm.get('secret_key').setValue(uuidv4());

    this.route.queryParams.subscribe(params => {
      this.mode = params['q'];
  });
  }

  open(content: any) {
    this.modalService.open(content, {centered: true});
  }

  openReplyModal(reply: any) {
    this.modalService.open(reply, {size: 'lg', centered: true});
  }

  generateUUID(){
    this.uuid = uuidv4();
  }

  onSaveOrUpdate() {

    this._caseModel = this.caseCreateForm.value;
    this._caseModel.status = 'NEW';

    //Checking Form Validation
    this.submitted = true;
    if (this.caseCreateForm.invalid) {
      return;
    }


    this._requestData.BusinessData = {
      Case: this._caseModel,
      CaseAttachment: this._caseArrachmentModelModel
    }


    this.ngxService.start();
    this._caseService.createOrUpdateCase(this._requestData).subscribe(
      response => {
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        this.ngxService.stop();
        if (this._data.ResponseCode = 2000)
        {
          this.submitted = false;
          this._caseModel = new Case();
          this._caseArrachmentModelModel = [];
          this.caseCreateForm.reset();
          this.modalService.open(this.content);
          this.caseCreateForm.get('secret_key').setValue(uuidv4());
        }
        else {
          this._generateToasta.showToast('danger', 'Failed!', "Case Creation Failed!");
        }
      },
      error => {
        this.ngxService.stop();
        this._generateToasta.showToast('danger', 'Failed!', error.message);
      },
      () => {
        this.ngxService.stop();
        // No errors, route to new page
      }
    );

  }

  onFileUpload(event: any) {

    // Any file(s) selected from the input?
    if (event.target.files && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
        let file = event.target.files[index];
        // Don't allow file sizes over 1MB
        if (file.size < 1 * 1048576) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let _uploadFile = new CaseAttachment();
            _uploadFile.file_name = file.name;
            _uploadFile.base_64 = (reader.result as string).split(",").pop();
            this._caseArrachmentModelModel.push(_uploadFile);
          };
          reader.onerror = function (error) {
          };

        }
        else {
          alert("File: " + file.name + " is too large to upload.");
        }
      }

    }
  }

  public removeFile(itemVal: any) {
    let index = this._caseArrachmentModelModel.indexOf(itemVal);
    this._caseArrachmentModelModel.splice(index, 1);
  }
}
