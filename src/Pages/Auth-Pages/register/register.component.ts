import { Component } from '@angular/core';
import { RegisterFormComponent } from "../../../Components/Auth-components/register-form/register-form.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
