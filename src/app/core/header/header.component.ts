import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authenticationService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthenticationService]
})
export class HeaderComponent {
  public username: Observable<string>;

  public constructor(private readonly authService: AuthenticationService) {
    this.username = this.authService.getUserInfo().pipe(map(item =>
      `${item.name.first} ${item.name.last}`));
  }

  public onLogoffButtonClick(): void {
    const userEmail = this.authService.getUserInfo();
    this.authService.logout();
    console.log(`User with email: ${userEmail} logged out!`);
  }

  public isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
