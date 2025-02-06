import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { PharmacyInformation } from '../models/Pharmacy-details';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Auth0Service {
  constructor(private configService: ConfigService,private http: HttpClient) {}

  getConfigValue(key:string): string {    
    return this.configService.getConfig(key);
  }

  generateAuth0LoginURL():string{
    return `https://${this.getConfigValue("Auth0Domain")}/authorize?response_type=code&client_id=${this.getConfigValue("Auth0client_id")}&redirect_uri=${this.getConfigValue("Auth0_redirect_uri")}&state=STATE&ADDITIONAL_PARAMETERS&scope=openid profile email offline_access`;
  }
  //Get Berer token(Idtoken, AccessToken and refresh_token)
  getTokenData(code:string): Observable<any> { 
    let  params = new HttpParams().set('AuthCode', code);
    return this.http.get<any>(this.getConfigValue("apiAuth0BaseUrl") + '/token', {params});
  }

  // Store the access token in localStorage
  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }
  storeExpiresIn(expiryIn: number): void {    
    const expiryTimestamp = Date.now() + (expiryIn);
    localStorage.setItem('expires_in', expiryTimestamp.toString());
  }
  storeRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  }
  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Remove token on logout
  logout(): void {
    localStorage.removeItem('auth_token');
  }
  // Auth0Service: Check if token is expired or will expire in less than 2 minutes
isTokenExpired(): boolean {
  const expiryTime = localStorage.getItem('expires_in');
  if (!expiryTime) return true; // If there's no expiry time, assume it's expired

  const currentTime = Date.now();
  return currentTime >= Number(expiryTime);  // Token expired if current time >= expiry time
}

// Check if token will expire in 2 minutes
  isTokenExpiringSoon(): boolean {    
    const expiryTime = localStorage.getItem('expires_in');
    if (!expiryTime) return true; // If there's no expiry time, assume it's expired
    
    const currentTime = Date.now();
    return (Number(expiryTime) - currentTime) <= 2 * 60 * 1000; // 2 minutes in ms
  }
// Auth0Service: Refresh the token
refreshToken(): Observable<any> {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    //return throwError('No refresh token found');
  }

  return this.http.post<any>(`${this.getConfigValue("apiAuth0BaseUrl")}/refresh`, { refresh_token: refreshToken });
}
generateLogOutURL():string{
  return `https://${this.getConfigValue("Auth0Domain")}/v2/logout?client_id=${this.getConfigValue("Auth0client_id")}&returnTo=${this.getConfigValue("Auth0LogOut_URL")}`;
}

storeUserProfile(user: any): void {
  localStorage.setItem('userProfile', user);
}
clearSession(){
  localStorage.clear();
}
getUserProfileFromStorage(): string | null {
  return localStorage.getItem('userProfile');
}
changePassword(emailId:string): Observable<any> { 
 let  params = new HttpParams().set('emailId', emailId);
  return this.http.get<any>(this.getConfigValue("apiAuth0BaseUrl") + '/change-password', {params});
}
storeChangePassword(code: string): void {
  localStorage.setItem('passwordReset', code);
}
resetChangePassword(){
  localStorage.removeItem('passwordReset');
}

}