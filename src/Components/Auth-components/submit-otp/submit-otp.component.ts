import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmallLoaderComponent } from "../../../shared/shared-components/small-loader/small-loader.component";
import { FormFieldComponent } from "../../../shared/shared-components/form-field/form-field.component";
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { LocalstorageService } from '../../../Services/localstorage.service';

@Component({
  selector: 'app-submit-otp',
  standalone: true,
  imports: [ReactiveFormsModule, SmallLoaderComponent, FormFieldComponent,CommonModule],
  templateUrl: './submit-otp.component.html',
  styleUrl: './submit-otp.component.scss'
})
export class SubmitOtpComponent {

  @Input({required:true}) isOtpSubmit:boolean = false
  isRequestSend:boolean = false


  otpForm:FormGroup = new FormGroup({
    resetCode: new FormControl('',[Validators.required])
  })

  constructor(
      private router:Router,
      private authService:AuthService,
      private localstorageService:LocalstorageService
    ){
    }





    onOtpSubmit():void{
      if (this.otpForm.valid && this.isOtpSubmit) {
        this.isRequestSend = true
        this.authService.submitOtp(this.otpForm.value).subscribe({
          next:(response)=>{
            if(response.status === "Success"){
              this.localstorageService.setItemIntoLocalStorage("canOpenChange",'true')
              this.isRequestSend = false
              this.router.navigateByUrl('/passChange')
            }
          },
          error:(err)=>{
            this.isRequestSend = false
          }
        })
      }
    }

}
