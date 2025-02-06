import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth0Service } from '../services/Auth0.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth0Service: Auth0Service, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {    
    const token = this.auth0Service.getToken();
    if (!token) {
      this.router.navigate(['/login']);  // Redirect to login if no token is found
      return false;
    }
    if (this.auth0Service.isTokenExpiringSoon()) {
      console.log('Token is expiring soon, refreshing...');
      this.auth0Service.refreshToken().subscribe({
        next: (response) => {
          console.log('Token refreshed:', response);
          // Store the new token and expiry
          this.auth0Service.storeToken(response.id_token);
          this.auth0Service.storeExpiresIn(240000);//response.expires_in);
          this.auth0Service.storeRefreshToken(response.refresh_token);
        },
        error: (error) => {
          console.error('Error refreshing token:', error);
        }
      });
    }
    return true;  // If token exists, allow access to the route
  }
}
