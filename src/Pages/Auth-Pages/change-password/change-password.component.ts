import { Component } from '@angular/core';
import { ChangePasswordFormComponent } from "../../../Components/Auth-components/change-form/change-form.component";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ChangePasswordFormComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  isSend:boolean = false
}
