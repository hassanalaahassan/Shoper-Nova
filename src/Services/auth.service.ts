import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClinetApiService } from './clinet-api.service';
import { LocalstorageService } from './localstorage.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ILogin, IRegister } from '../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private clinet:ClinetApiService,
    private local:LocalstorageService,
  ) { }

  login(user:ILogin):Observable<any>{
    return this.clinet.postMethod("auth/signin",user)
  }
  register(user:IRegister):Observable<any>{
    return this.clinet.postMethod("auth/signup",user)
  }
  matchPasswords(passwordField: string, confirmField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordField)?.value;
      const confirmControl = formGroup.get(confirmField);

      if (!confirmControl) return null;

      if (password !== confirmControl.value) {
        const currentErrors = confirmControl.errors || {};
        confirmControl.setErrors({ ...currentErrors, match: true });
        return { match: true };
      } else {
        const currentErrors = confirmControl.errors;
        if (currentErrors) {
          delete currentErrors['match'];
          if (Object.keys(currentErrors).length === 0) {
            confirmControl.setErrors(null);
          } else {
            confirmControl.setErrors(currentErrors);
          }
        }
        return null;
      }
    };
  }
}
