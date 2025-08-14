import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { UsersService } from './services/users.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(UsersService);
  const router = inject(Router);                      
  if (auth.isLoggedIn() ) {
    return true;
  
  } else {
    router.navigate(['/productos/galeria']);
    return false;
  }
};
