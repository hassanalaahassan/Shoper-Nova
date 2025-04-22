import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private notyf: Notyf;

  constructor() {
    this.notyf = new Notyf({
      duration: 3000,
      position: { x: 'right', y: 'top' },
      ripple: true,
      types: [
        {
          type: 'warning',
          background: 'orange',
        },
        {
          type: 'info',
          background: 'blue',
          icon: false
        }
      ]
    });
  }

  success(message: string|any) {
    this.notyf.open({
      type: 'success',
      message: message,
      background: '#47D764',
    });
  }

  error(message: string|any) {
    this.notyf.open({
      type: 'error',
      message: message,
      background: '#E54887',
    });
  }

  warning(message: string|any) {
    this.notyf.open({
      type: 'warning',
      message: message,
      background: '#FFA534',
    });
  }

  info(message: string|any) {
    this.notyf.open({
      type: 'info',
      message: message,
      background: '#4C9AFF'
    });
  }
}
