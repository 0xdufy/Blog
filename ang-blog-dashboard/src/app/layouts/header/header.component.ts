import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  authService: AuthService = inject(AuthService);
  email: string;
  isLoggedIn: boolean = false;

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('user')).email;

  }
  ngDoCheck() {
    this.isLoggedIn =
    localStorage.getItem('user') == null ||
    localStorage.getItem('user') == null
      ? false
      : true;
  }

  logOut() {
    this.authService.logOut();
  }
}
