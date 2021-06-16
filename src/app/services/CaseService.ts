import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
  createOrUpdateCase(busData: any) {
    const options = {
      headers: this.headers
    }
    return this.http.post(this.baseUrl + "case/case-create", busData, options);
  }
}
