import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from "../../../shared/shared-components/form-field/form-field.component";
import { AuthService } from '../../../Services/auth.service';
import { IReset } from '../../../shared/interfaces/auth';
import { SmallLoaderComponent } from "../../../shared/shared-components/small-loader/small-loader.component";
import { CommonModule } from '@angular/common';
import { LocalstorageService } from '../../../Services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, SmallLoaderComponent,CommonModule],
  templateUrl: './change-form.component.html',
  styleUrl: './change-form.component.scss'
})
export class ChangePasswordFormComponent implements OnDestroy {

  resetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required , Validators.email]),
    newPassword: new FormControl('',[Validators.required , Validators.minLength(6)])
  })

  isSend:boolean = false


  constructor(
    private authService:AuthService,
    private localstorage:LocalstorageService,
    private router:Router
  ){}

  submitResetForm():void{
    if (this.resetPasswordForm.valid && !this.isSend ) {
      this.isSend = true
      this.authService.changePassword(this.resetPasswordForm.value as IReset).subscribe({
        next:(response:any)=>{
          this.handleResetSuccess(response)
        },
        error:(err)=>{
          this.isSend = false
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.localstorage.removeItemFormLocalStorage("canOpenChange")
  }

   handleResetSuccess(response: any): void {
    if (response.token) {
      this.isSend = false
      this.router.navigate(['/login']);
    }
  }

}
