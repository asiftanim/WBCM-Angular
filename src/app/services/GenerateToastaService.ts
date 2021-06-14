import { Injectable } from '@angular/core';
import { ToastaService, ToastOptions } from 'ngx-toasta';

@Injectable({
  providedIn: 'root'
})

export class GenerateToastaService {

  constructor(private toastaService: ToastaService) {
  }

  //Toast Service
  showToast(statusToast: any, titleToast: any, messageToast: any) {
    const shortCutFunction = statusToast;
    const toastOptions: ToastOptions = {
      title: titleToast,
      msg: messageToast,
      showClose: false,
      timeout: 5000,
      theme: 'bootstrap'
    };

    if (shortCutFunction === 'success') {
      this.toastaService.success(toastOptions);
    }

    if (shortCutFunction === 'info') {
      this.toastaService.info(toastOptions);
    }

    if (shortCutFunction === 'warning') {
      this.toastaService.warning(toastOptions);
    }

    if (shortCutFunction === 'danger') {
      this.toastaService.error(toastOptions);
    }
  }

  clearAllToasts() {
    this.toastaService.clearAll();
  }
};
