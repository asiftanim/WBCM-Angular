import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileDownloadService {

  public downloadFile(fileNamewithExtension, byteArray) {
    var arByffer = this.base64ToArrayBuffer(byteArray);
    var FilTypeToSave = this.getFileType(fileNamewithExtension);
    this.saveByteArray(fileNamewithExtension, arByffer, FilTypeToSave);

  }

  public base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  private getFileType(file) {
    let fileName = file;
    let checkFileType = fileName.split('.').pop();
    var fileType;
    if (checkFileType == ".txt") {
      fileType = "text/plain";
    }
    if (checkFileType == ".pdf") {
      fileType = "application/pdf";
    }
    if (checkFileType == ".doc") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".docx") {
      fileType = "application/vnd.ms-word";
    }
    if (checkFileType == ".xls") {
      fileType = "application/vnd.ms-excel";
    }
    if (checkFileType == ".png") {
      fileType = "image/png";
    }
    if (checkFileType == ".jpg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".jpeg") {
      fileType = "image/jpeg";
    }
    if (checkFileType == ".gif") {
      fileType = "image/gif";
    }
    if (checkFileType == ".csv") {
      fileType = "text/csv";
    }
    if (checkFileType == ".zip") {
      fileType = "application/zip";
    }

    return fileType;
  }

  public saveByteArray(reportName, byte, fileType) {
    //var blob = new Blob([byte], { type: "application/octet-stream" });
    var blob = new Blob([byte], { type: fileType });

    console.log(blob);


    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  };

};
