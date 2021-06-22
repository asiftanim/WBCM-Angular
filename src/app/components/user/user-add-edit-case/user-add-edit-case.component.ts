import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CaseDetails } from '../../../models/CaseDetails';
import { FileDownloadService } from '../../../services/utility/FileDownloadService';
import { CaseReply } from '../../../models/CaseReply';

@Component({
  selector: 'app-user-add-edit-case',
  templateUrl: './user-add-edit-case.component.html',
  styleUrls: ['./user-add-edit-case.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserAddEditCaseComponent implements OnInit {

  uuid: any;

  public CaseIdForEdit: any;
  public userMode: any;

  @ViewChild('content', { static: false }) private content: any;

  public _requestData: APIRequestModel = new APIRequestModel();
  public _data: APIResponseModel = new APIResponseModel();

  public _caseModel: Case = new Case();
  public _caseDetails: CaseDetails = new CaseDetails();
  public _caseArrachmentModelModel: CaseAttachment[] = [];
  public _chatReply: CaseReply[] = [];
  public replyMsg: string = "";
  public agreeCheckBox: boolean = false;

  // Form Valdation
  public caseCreateForm: any;
  public validatorErrorMsg: any;
  submitted = false;
  get f() { return this.caseCreateForm?.controls; }

  constructor(private modalService: NgbModal,
              private route: ActivatedRoute,
              private _caseService: CaseService,
    private _formValidationService: FormValidationService,
    private _fileDownloadService: FileDownloadService,
    private ngxService: NgxUiLoaderService,
    private _generateToasta: GenerateToastaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.CaseIdForEdit = this.activatedRoute.snapshot.paramMap.get("id");

    this.userMode = this.activatedRoute.snapshot.paramMap.get("mode");
      
    this.caseCreateForm = this._formValidationService.getCaseCreateConfig().formGroup;
    this.validatorErrorMsg = this._formValidationService.getCaseCreateConfig().formValidationErrorMsg;

    if (this.CaseIdForEdit) {
      this.fetchCaseDetails(this.CaseIdForEdit);
    } else {
      this.generateUUID();
      this.caseCreateForm.get('secret_key').setValue(this.uuid);
    }
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
    if (this._caseDetails.Case) {
      this.caseCreateForm.get('secret_key').setValue(this._caseDetails.Case.secret_key);
    } else {
      this.caseCreateForm.get('secret_key').setValue(this.uuid);
    }
    
    this._caseModel = this.caseCreateForm.value;

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
        if (this._data.ResponseCode == 2000)
        {
          if (this.CaseIdForEdit) {
            this._caseDetails = JSON.parse(JSON.stringify(this._data.BusinessData))
            this._caseModel = this._caseDetails.Case;
            this._caseArrachmentModelModel = this._caseDetails.CaseAttachment;
            this.caseCreateForm.patchValue(this._caseModel);
            this._generateToasta.showToast('success', 'Success!', "Case Updated Successfully!");
          } else {
            this.submitted = false;
            this._caseModel = new Case();
            this._caseArrachmentModelModel = [];
            this.caseCreateForm.reset();
            this.modalService.open(this.content, { centered: true });
            this.generateUUID();
          }
        }
        else {
          this._generateToasta.showToast('danger', 'Failed!', "Case Operation Failed!");
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
          alert("File: " + file.name + " is too large to upload. Max limit is 1MB");
        }
      }

    }
  }

  public removeFile(itemVal: CaseAttachment) {

    if (!confirm("Are you sure to delete " + itemVal.file_name)) {
      return;
    }

    if (itemVal.id) {
      this.removeAttachmentFromServer(itemVal.id, itemVal);
    }
    else {
      let index = this._caseArrachmentModelModel.indexOf(itemVal);
      this._caseArrachmentModelModel.splice(index, 1);
    }
  }

  public fetchCaseDetails(caseId: string) {
    this.ngxService.start();
    this._caseService.fetchCaseDetails(caseId).subscribe(
      response => {
        this.ngxService.stop();
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          this._caseDetails = JSON.parse(JSON.stringify(this._data.BusinessData))
          this._caseModel = this._caseDetails.Case;
          this._caseArrachmentModelModel = this._caseDetails.CaseAttachment;
          this._chatReply = this._caseDetails.CaseReply;
          console.log(this._chatReply);
          this.caseCreateForm.patchValue(this._caseModel);
        }
        else {
          this.ngxService.stop();
          this._generateToasta.showToast('danger', 'Failed!', "Can't fetch case info!");
        }
      },
      error => {
        this.ngxService.stop();
        this._generateToasta.showToast('danger', 'Failed!', error.message);
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  public removeAttachmentFromServer(caseAttachmentId: string, itemCaseAttachment: CaseAttachment) {
    this.ngxService.startBackground("loader-attachment");
    this._caseService.deleteCaseAttachment(caseAttachmentId).subscribe(
      response => {
        this.ngxService.stopBackground("loader-attachment");
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          let index = this._caseArrachmentModelModel.indexOf(itemCaseAttachment);
          this._caseArrachmentModelModel.splice(index, 1);
          this._generateToasta.showToast('success', 'Success!', "Attachment deleted Successfully!");
        }
        else {
          this._generateToasta.showToast('danger', 'Failed!', "Attachment delete failed!");
        }
      },
      error => {
        this.ngxService.stopBackground("loader-attachment");
        this._generateToasta.showToast('danger', 'Failed!', error.message);
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  public downloadFile(caseAttachment: CaseAttachment) {
    this.ngxService.startBackground("loader-attachment");
    this._caseService.downloadCaseAttachment(caseAttachment.id).subscribe(
      response => {
        this.ngxService.stopBackground("loader-attachment");
        this._data = JSON.parse(JSON.parse(JSON.stringify(response)));
        if (this._data.ResponseCode == 2000) {
          var fileBase64 = this._data.BusinessData;
          this._fileDownloadService.downloadFile(caseAttachment.file_name, fileBase64);
          this._generateToasta.showToast('success', 'Success!', "Attachment Downloaded Successfully!");
        }
        else {
          this._generateToasta.showToast('danger', 'Failed!', "Attachment Download failed!");
        }
      },
      error => {
        this.ngxService.stopBackground("loader-attachment");
        this._generateToasta.showToast('danger', 'Failed!', error.message);
      },
      () => {
        // No errors, route to new page
      }
    );
  }

  sendReply() {

    this.ngxService.start();

    var reply = new CaseReply();
    reply.case_id = this._caseDetails.Case.id;
    reply.creator_type = "User";
    reply.message = this.replyMsg;

    this._caseService.sendReply(reply).subscribe(response => {
      this.ngxService.stop();
      var data = JSON.parse(JSON.parse(JSON.stringify(response)));
      this._chatReply = JSON.parse(JSON.stringify(data.BusinessData));
      this.replyMsg = "";
    });

  }

  redirectToHome() {
    this.router.navigateByUrl('/');
  }
}
