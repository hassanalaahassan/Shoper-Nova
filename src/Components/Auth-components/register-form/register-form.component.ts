import { Component, OnInit } from '@angular/core';
import { FormFieldComponent } from "../../../shared/shared-components/form-field/form-field.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { IRegister } from '../../../shared/interfaces/auth';
import { ISignupResponse } from '../../../shared/interfaces/api';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormFieldComponent,ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {

  isSend:boolean = false

  registerForm!:FormGroup

  constructor(
    private authService:AuthService,
    private router:Router,
  ){}

  ngOnInit(): void {
      this.registerForm = this.createRegForm()
  }

  private createRegForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z\s]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]),
    },{ validators: this.authService.matchPasswords('password', 'rePassword') });
  }
  submitRegister():void{
    if (!this.isSend && this.registerForm.valid) {
      this.authService.register(this.registerForm.value as IRegister).subscribe({
        next:(response:ISignupResponse)=>{
          if (response.token) {
            this.goToLoginPage()
          }
        },
        complete:()=>this.isSend = !this.isSend
      })
    }
  }

  goToLoginPage():void{
    this.router.navigate(['/login'])

  }

}
