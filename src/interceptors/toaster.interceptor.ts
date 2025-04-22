import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ToastService } from '../Services/toast.service';
import { ISignupResponse } from '../shared/interfaces/api';
import { HttpResponse } from '@angular/common/http';

export const toasterInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  return next(req).pipe(
    tap({
      next: (response) => {
        if (response instanceof HttpResponse) {
          const apiResponse = response.body as ISignupResponse;
          if (apiResponse && apiResponse.message) {
            toast.success(apiResponse.message);
          }
        }
      },
      error: (err) => {
        if (err.error) {
          toast.error(err.error.message);
        }
      }
    })
  );
};
