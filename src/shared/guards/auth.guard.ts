import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService)
  const currentUser = auth.getCurrentUser()
  if (currentUser.email && currentUser.name) {
    return true
  }
  return false;
};
