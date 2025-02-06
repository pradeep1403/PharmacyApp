// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Auth0Service } from './Auth0.service';
// import { ConfigService } from './config.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private apiBaseUrl = this.getConfigValue("apiBaseUrl");

//   constructor(private http: HttpClient, private configService: ConfigService, private auth0Service: Auth0Service) {}

//   getConfigValue(key:string): string {    
//     return this.configService.getConfig(key);
//   }
//   // Helper to get the authorization header with the token
//   private getHeaders(): HttpHeaders {
//     const token = this.auth0Service.getToken();
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });
//   }

//   private handleError(error: any): Observable<never> {
//     debugger;
//     if (error instanceof HttpErrorResponse) {
//       // Ensure the error is of type HttpErrorResponse
//       if (error.status === 401) {
//         // Handle 401 error - Redirect to error page
//         window.location.href = '/error/401';  // You can programmatically redirect using router as well
//       }
//       console.error('API Error:', error.status, error.message);
//     } else {
//       // For any other type of error
//       console.error('Unexpected error:', error);
//     }
//     return throwError(() => new Error('Something went wrong! Please try again later.'));
//   }

//   // GET request method
//   getData(endpoint: string): Observable<any> {
//     const headers = this.getHeaders();
//     return this.http.get(`${this.apiBaseUrl}/${endpoint}`, { headers }).pipe(
//       //catchError(this.handleError)
//     );
//   }

//   // POST request method
//   postData(endpoint: string, data: any): Observable<any> {
//     const headers = this.getHeaders();
//     return this.http.post(`${this.apiBaseUrl}/${endpoint}`, data, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // PUT request method
//   putData(endpoint: string, data: any): Observable<any> {
//     const headers = this.getHeaders();
//     return this.http.put(`${this.apiBaseUrl}/${endpoint}`, data, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }

//   // DELETE request method
//   deleteData(endpoint: string): Observable<any> {
//     const headers = this.getHeaders();
//     return this.http.delete(`${this.apiBaseUrl}/${endpoint}`, { headers }).pipe(
//       catchError(this.handleError)
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auth0Service } from './Auth0.service';  // Assuming you have an Auth0Service for getting tokens
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = this.getConfigValue('apiBaseUrl');

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private auth0Service: Auth0Service
  ) {}

  getConfigValue(key: string): string {
    return this.configService.getConfig(key);
  }

  // Helper to get the authorization header with the token
  private getHeaders(): HttpHeaders {
    const token = this.auth0Service.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Centralized error handling
  private handleError(error: any): Observable<never> {    
    if (error.status === 401) {
      console.error('Unauthorized Error:', error);
      window.location.href = '/error/401';
      // Optionally, you could also redirect here, but the interceptor will handle this
    }
    return throwError(() => new Error(error.message || 'Something went wrong!'));
  }

  // GET request method
  getData(endpoint: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}/${endpoint}`, { headers }).pipe(
      catchError(this.handleError)  // Use the centralized error handler
    );
  }

  // POST request method
  postData(endpoint: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}/${endpoint}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // PUT request method
  putData(endpoint: string, data: any): Observable<any> {    
    const headers = this.getHeaders();
    return this.http.put(`${this.apiBaseUrl}/${endpoint}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE request method
  deleteData(endpoint: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiBaseUrl}/${endpoint}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}

