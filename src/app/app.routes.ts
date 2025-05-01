import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../Layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../Pages/Auth-Pages/login/login.component';
import { RegisterComponent } from '../Pages/Auth-Pages/register/register.component';
import { ResetPasswordComponent } from '../Pages/Auth-Pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from '../Pages/Auth-Pages/change-password/change-password.component';
import { changePasswordGuard } from '../shared/guards/change-password.guard';
import { MainLayoutComponent } from '../Layouts/main-layout/main-layout.component';
import { HomeComponent } from '../Pages/home/home.component';
import { authGuard } from '../shared/guards/auth.guard';
import { CategoryComponent } from '../Pages/category/category.component';
import { SubCategoriesComponent } from '../Pages/sub-categories/sub-categories.component';
import { ProductDetailesComponent } from '../Pages/product-detailes/product-detailes.component';
import { ProductsComponent } from '../Pages/products/products.component';
import { CartComponent } from '../Pages/cart/cart.component';
import { WishListComponent } from '../Pages/wish-list/wish-list.component';

export const routes: Routes = [

  {
    path:'',
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
      },
      {
        path:"passReset",
        component:ResetPasswordComponent,
        data:{title:"Reset Password"}
      },
      {
        path:"passChange",
        canActivate:[changePasswordGuard],
        component:ChangePasswordComponent,
        data:{title:"Change Password"}
      }
    ]
  },
  {
    path:'',
    component:MainLayoutComponent,
    canActivate:[authGuard],
    children:[
      {
        path:'home',
        component:HomeComponent,
        data:{title:'Home'}
      },
      {
        path:'categories',
        component:CategoryComponent,
        data:{title:'Categories'}
      },
      {
        path:'category/:id',
        component:SubCategoriesComponent,
        data:{title:'Sub Category'}
      },
      {
        path:'product/:id',
        component:ProductDetailesComponent,
        data:{title:'Product Detailes'}
      },
      {
        path:'products',
        component:ProductsComponent,
        data:{title:'All Products'}
      },
      {
        path:'cart',
        component:CartComponent,
        data:{title:'Cart'}
      },
      {
        path:'wishList',
        component:WishListComponent,
        data:{title:'Wish List'}
      },
    ]
  }
];
