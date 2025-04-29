import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClinetApiService } from './clinet-api.service';
import { LocalstorageService } from './localstorage.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ILogin, IRegister, IReset } from '../shared/interfaces/auth';
import { IUser } from '../shared/interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser:BehaviorSubject<IUser> = new BehaviorSubject({} as IUser)
  token:WritableSignal<string> = signal('')
  constructor(
    private clinet:ClinetApiService,
    private local:LocalstorageService,
  ) {
    this.checkLocalStorage()
  }
  login(user:ILogin):Observable<any>{
    return this.clinet.postMethod("auth/signin",user)
  }
  register(user:IRegister):Observable<any>{
    return this.clinet.postMethod("auth/signup",user)
  }
  sendOtp(email:string):Observable<any>{
    return this.clinet.postMethod("auth/forgotPasswords",email)
  }
  submitOtp(otp:string):Observable<any>{
    return this.clinet.postMethod("auth/verifyResetCode",otp)
  }
  changePassword(newPass:IReset):Observable<any>{
    return this.clinet.putMethod('auth/resetPassword',newPass)
  }
  setCurrentUser(user:IUser):void{
    this.currentUser.next(user)
  }
  getCurrentUser():IUser{
    let user = {} as IUser
    this.checkLocalStorage()
    this.currentUser.subscribe({
      next:(response:IUser)=>{
        console.log(response);

          user = response
      }
    })
    return user
  }
  checkLocalStorage():void{
    if (this.local.getItemIntoLocalStorage("currentUser")) {
      this.setCurrentUser(this.local.getItemIntoLocalStorage("currentUser"))
    }
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
