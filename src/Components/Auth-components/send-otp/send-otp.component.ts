import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../shared/shared-components/form-field/form-field.component';
import { SmallLoaderComponent } from "../../../shared/shared-components/small-loader/small-loader.component";
import { AuthService } from '../../../Services/auth.service';
import { IOtpResponse } from '../../../shared/interfaces/api';

@Component({
  selector: 'app-send-otp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormFieldComponent, SmallLoaderComponent],
  templateUrl: './send-otp.component.html',
  styleUrl: './send-otp.component.scss'
})
export class SendOtpComponent {

  isOtpSend:boolean = false
  @Output() canSubmitOtp:EventEmitter<boolean> = new EventEmitter()
  resetForm:FormGroup = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email])
    })
    constructor(
        private authService:AuthService
      ){
      }
      onFormSubmit():void{
        if (this.resetForm.valid && !this.isOtpSend) {
          this.isOtpSend = !this.isOtpSend
          this.authService.sendOtp(this.resetForm.value).subscribe({
            next:(response:IOtpResponse)=>{
              if (response.statusMsg === 'success') {
                this.isOtpSend = !this.isOtpSend
                this.canSubmitOtp.emit(true)
              }
            },
            error:(err)=>{
              this.isOtpSend = !this.isOtpSend
              this.canSubmitOtp.emit(false)
            }
          })
        }
      }
}
