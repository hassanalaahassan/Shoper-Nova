// loader.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, catchError, throwError } from 'rxjs';
import { LoaderService } from './../Services/loader.service';
import { Api } from '../Environment/environment';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  if (!req.url.includes(Api.url)) {
    return next(req);
  }

  // loader.show();

  return next(req).pipe(

    finalize(() => {
      return loader.reset();
    })
  );
};
