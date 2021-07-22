import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CaseReply } from '../models/CaseReply';

@Injectable({
  providedIn: 'root'
})

export class CaseService {
  baseUrl = environment.APIBaseURL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json', 'Accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  getCaseIdBySecrectKey(secrectKey: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "case/get-caseid/" + secrectKey, options);
  }

  createOrUpdateCase(busData: any) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "case/create", busData, options);
  }

  fetchCaseDetails(caseId: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "case/details/" + caseId, options);
  }

  deleteCaseAttachment(caseAttachmentId: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "case/delete/" + caseAttachmentId, options);
  }

  downloadCaseAttachment(caseAttachmentId: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "case/download-attachmnet/" + caseAttachmentId, options);
  }

  sendReply(caseReply: CaseReply) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "case/save-case-reply/", caseReply, options);
  }

  getAllCases() {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "case/get-all-cases", options);
  }

  getAllCasesByUserId(userId: string) {
    const options = {
      headers: this.headers
    }
    return this.http.get(this.baseUrl + "case/get-all-cases-by-userid/" + userId, options);
  }

  setCaseStatusAsFake(requestData: any) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "case/set-cases-as-fake", requestData, options);
  }

  assignCaseUser(requestData: any) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "case/assign-cases", requestData, options);
  }

}
