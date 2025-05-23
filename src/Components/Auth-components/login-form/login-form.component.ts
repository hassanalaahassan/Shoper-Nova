import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from "../../../shared/shared-components/form-field/form-field.component";
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { ILogin } from '../../../shared/interfaces/auth';
import { SmallLoaderComponent } from "../../../shared/shared-components/small-loader/small-loader.component";
import { CommonModule } from '@angular/common';
import { ISignupResponse } from '../../../shared/interfaces/api';
import { LocalstorageService } from '../../../Services/localstorage.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, SmallLoaderComponent,CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required , Validators.email]),
    password: new FormControl('',[Validators.required , Validators.minLength(6)])
  })

  isSend:boolean = false


  constructor(
    private authService:AuthService,
    private router:Router,
    private localstorage:LocalstorageService
  ){}

  submitLoginForm():void{
    if (this.loginForm.valid && !this.isSend ) {
      this.isSend = true
      this.authService.login(this.loginForm.value as ILogin).subscribe({
        next:(response:ISignupResponse)=>{
          this.handleLoginSuccess(response)
        },
        error:(err)=>{
          this.isSend=false
        }
      })
    }
  }

   handleLoginSuccess(response:ISignupResponse): void {
    if (response.message === "success") {
      this.authService.setCurrentUser(response.user)
      this.localstorage.setItemIntoLocalStorage("currentUser",response.user)
      this.authService.token.set(response.token)
      this.isSend=false
      this.router.navigate(['/home']);
    }
  }
  goToRegisterPage():void{
    this.router.navigateByUrl('/register')
  }
  goToResetPage():void{
    this.router.navigateByUrl('/passReset')
  }
}
