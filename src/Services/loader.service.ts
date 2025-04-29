// loader.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private activeRequests = 0;
  isLoading = signal(false);

  show(): void {
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.isLoading.set(true);
    }
  }

  hide(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }

    if (this.activeRequests === 0) {
      this.isLoading.set(false);
    }
  }

  reset(): void {
    this.activeRequests = 0;
    this.isLoading.set(false);
  }
}
