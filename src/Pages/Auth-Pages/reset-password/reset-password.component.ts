import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { SendOtpComponent } from "../../../Components/Auth-components/send-otp/send-otp.component";
import { SubmitOtpComponent } from "../../../Components/Auth-components/submit-otp/submit-otp.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, SendOtpComponent, SubmitOtpComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  submitOtb:boolean = false

  constructor(
    private router:Router,
  ){
  }

  reciveCanOtbSubmit(event:boolean):void{
    this.submitOtb=event
  }


  goToLoginPage():void{
    this.router.navigateByUrl('/login')
  }


}
