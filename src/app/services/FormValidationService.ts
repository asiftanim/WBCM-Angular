
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { FormValidationBuilderModel } from '../models/FormValidationBuilderModel';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  _customMessageObj: any;
  public _formBuilder: FormValidationBuilderModel;
  submitted = false;


  constructor(private formBuilder: FormBuilder) {
    this._formBuilder = new FormValidationBuilderModel();
  }

  getCaseCreateConfig() {
    this._formBuilder.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      country: ['', [Validators.required]],
      summary: ['', [Validators.required]],
      details: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      secret_key: ['', [Validators.required]],
    });
    this._customMessageObj = [{
      name: { required: 'Name is required!' },
      company: { required: 'Company is required!' },
      country: { required: 'Country is required!' },
      summary: { required: 'Summary is required!' },
      details: { required: 'Details is required!' },
      gender: { required: 'Gender is required!' },
    }];
    this._formBuilder.formValidationErrorMsg = this._customMessageObj[0];
    return this._formBuilder;
  }

}
