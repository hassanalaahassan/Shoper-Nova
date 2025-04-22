import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../Layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../Pages/Auth-Pages/login/login.component';
import { RegisterComponent } from '../Pages/Auth-Pages/register/register.component';

export const routes: Routes = [

  {
    path:"",
    component:AuthLayoutComponent,
    children:[
      {
        path:'',
        redirectTo:'login',
        pathMatch:"full"
      },
      {
        path:"login",
        component:LoginComponent,
        data:{title:"Login"}

      },
      {
        path:"register",
        component:RegisterComponent,
        data:{title:"Register"}
      }
    ]
  }
];
