import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  let router: Router = inject(Router);
  let toastr: ToastrService = inject(ToastrService);
  if(authService.isLoggedGuard) {
    return true;
  }else {
    router.navigate(['login']);
    toastr.warning('You do not have permission to access this page.');
    return false;
  }
};
