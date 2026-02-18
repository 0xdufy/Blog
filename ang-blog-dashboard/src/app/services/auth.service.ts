import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fireAuth: AngularFireAuth = inject(AngularFireAuth);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router);
  isLoggedGuard: boolean =
    localStorage.getItem('user') == null || localStorage.getItem('user') == null
      ? false
      : true;

  login(email: string, password: string) {
    this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.success('Logged In Successfully');
        this.router.navigate(['']);
        this.loadUser();
        this.isLoggedGuard = true;
      })
      .catch(() => {
        this.toastr.error('Wrong Email or Password');
      });
  }

  loadUser() {
    this.fireAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.fireAuth.signOut().then(() => {
      this.toastr.success('User Logged Out Successfully');
      this.router.navigate(['login']);
      localStorage.removeItem('user');
      this.isLoggedGuard = false;
    });
  }
}
