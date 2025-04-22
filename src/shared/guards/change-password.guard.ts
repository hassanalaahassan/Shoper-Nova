import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from '../../Services/localstorage.service';

export const changePasswordGuard: CanActivateFn = (route, state) => {

  const localStorage = inject(LocalstorageService)
  const router = inject(Router)
  const canOpen = localStorage.getItemIntoLocalStorage("canOpenChange")
  if(canOpen){
    return true
  }
  router.navigateByUrl('/login')
  return false
};
