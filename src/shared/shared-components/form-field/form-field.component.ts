import { Component, Input,  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input({required:true}) label: string = '';
  @Input({required:true}) type: string = 'text';
  @Input({required:true}) controlName: any ;
  @Input({required:true}) placeholder: string = 'text';
  @Input() touched: boolean | undefined = undefined;
  @Input() required: boolean | undefined = undefined;
  @Input() minLen: boolean | undefined = undefined;
  @Input() email: boolean | undefined = undefined;
  @Input() pattern: boolean | undefined = undefined;
  @Input() phone: boolean | undefined = undefined;
  @Input() isMatch: boolean | undefined = undefined;
  requiredClass:string = 'text-[#2C2C54]'
  emailClass:string = 'text-[#2C2C54]'
  minLenClass:string = 'text-[#2C2C54]'
  patternClass:string = 'text-[#2C2C54]'
  phoneClass:string = 'text-[#2C2C54]'
  isMatchClass:string = 'text-[#2C2C54]'


  requiredImage(): any {
    if (this.required) {
      if (this.touched) {
        this.requiredClass = 'text-[#E54887]';
        return 'assets/Images/Auth/Icons/red-check.svg';
      }
      return 'assets/Images/Auth/Icons/check.svg';
    } else if (this.touched) {
      this.requiredClass = 'text-[#47D764]';
      return 'assets/Images/Auth/Icons/green-check.svg';
    }

    this.requiredClass = 'text-[#2C2C54]';
    return 'assets/Images/Auth/Icons/check.svg';
  }
  emailImage():any{
    if (this.email || this.required) {
      if (this.touched) {
        this.emailClass = 'text-[#E54887]';
        return 'assets/Images/Auth/Icons/red-check.svg';
      }
      return 'assets/Images/Auth/Icons/check.svg';
    } else if (this.touched) {
      this.emailClass = 'text-[#47D764]';
      return 'assets/Images/Auth/Icons/green-check.svg';
    }

    this.emailClass = 'text-[#2C2C54]';
    return 'assets/Images/Auth/Icons/check.svg';
  }
  minLenImage():any{
    if (this.minLen || this.required) {
      if (this.touched) {
        this.minLenClass = 'text-[#E54887]';
        return 'assets/Images/Auth/Icons/red-check.svg';
      }
      return 'assets/Images/Auth/Icons/check.svg';
    } else if (this.touched) {
      this.minLenClass = 'text-[#47D764]';
      return 'assets/Images/Auth/Icons/green-check.svg';
    }

    this.minLenClass = 'text-[#2C2C54]';
    return 'assets/Images/Auth/Icons/check.svg';
  }
  phoneImage():any{
    if (this.phone || this.required) {
      if (this.touched) {
        this.phoneClass = 'text-[#E54887]';
        return 'assets/Images/Auth/Icons/red-check.svg';
      }
      return 'assets/Images/Auth/Icons/check.svg';
    } else if (this.touched) {
      this.phoneClass = 'text-[#47D764]';
      return 'assets/Images/Auth/Icons/green-check.svg';
    }

    this.phoneClass = 'text-[#2C2C54]';
    return 'assets/Images/Auth/Icons/check.svg';
  }
  isMatchImage():any{
    if (this.isMatch || this.required) {
      if (this.touched) {
        this.isMatchClass = 'text-[#E54887]';
        return 'assets/Images/Auth/Icons/red-check.svg';
      }
      return 'assets/Images/Auth/Icons/check.svg';
    } else if (this.touched) {
      this.isMatchClass = 'text-[#47D764]';
      return 'assets/Images/Auth/Icons/green-check.svg';
    }

    this.isMatchClass = 'text-[#2C2C54]';
    return 'assets/Images/Auth/Icons/check.svg';
  }
  patternImage():any{
    if (this.pattern || this.required) {
      if (this.touched) {
        this.patternClass = 'text-[#E54887]';
        return 'assets/Images/Auth/Icons/red-check.svg';
      }
      return 'assets/Images/Auth/Icons/check.svg';
    } else if (this.touched) {
      this.patternClass = 'text-[#47D764]';
      return 'assets/Images/Auth/Icons/green-check.svg';
    }

    this.patternClass = 'text-[#2C2C54]';
    return 'assets/Images/Auth/Icons/check.svg';
  }




}
