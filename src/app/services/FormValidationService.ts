
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, MinLengthValidator } from '@angular/forms';
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
      id: ['', []],
      name: ['', [Validators.required, Validators.minLength(5)]],
      company: ['', [Validators.required, Validators.minLength(5)]],
      country: ['', [Validators.required]],
      summary: ['', [Validators.required, Validators.minLength(5)]],
      details: ['', [Validators.required, Validators.minLength(10)]],
      gender: ['', [Validators.required]],
      secret_key: ['', [Validators.required]],
    });
    this._customMessageObj = [{
      id: {  },
      name: { required: 'Name is required!', minlength: 'Name is too short!'},
      company: { required: 'Company is required!', minlength: 'Company Name is too short!'},
      country: { required: 'Country is required!' },
      summary: { required: 'Summary is required!', minlength: 'Summary is too short!' },
      details: { required: 'Details is required!', minlength: 'Details is too short!' },
      gender: { required: 'Gender is required!' },
    }];
    this._formBuilder.formValidationErrorMsg = this._customMessageObj[0];
    return this._formBuilder;
  }

}
