import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private apiService: ApiService) {}

  // Fetch dashboard data
  getUserProfile(): Observable<any> {    
    return this.apiService.getData('UserProfile');
  }

}
