import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) {}

  // Fetch dashboard data
  getDashboardData(): Observable<any> {    
    return this.apiService.getData('pharmacies');
  }

  // Post new data to the dashboard
  postDashboardData(data: any): Observable<any> {
    return this.apiService.postData('create-dashboard', data);
  }

  // Update data on the dashboard
  putDashboardData(id: number, data: any): Observable<any> {
    return this.apiService.putData(`update-dashboard/${id}`, data);
  }

  // Delete data from the dashboard
  deleteDashboardData(id: number): Observable<any> {
    return this.apiService.deleteData(`delete-dashboard/${id}`);
  }

  // Update pharmacy prescription status
  updatePharmacyPrescriptionStatus(status: string, id: number, updatedBy: string): Observable<any> {    
    const url = `UpdatePharmacyPrescriptionStatus?status=${status}&Id=${id}&updatedBy=${updatedBy}`;
    return this.apiService.putData(url, {});
  }
  // Get pharmacy prescriptions by status
  getPharmacyPrescriptionsByStatus(status: string, pharmacyInfoId: number): Observable<any> {
    const url = `GetPharmacyPrescriptionsByStatus?status=${status}&pharmacyInfoId=${pharmacyInfoId}`;
    return this.apiService.getData(url);
  }
  // Get pharmacy prescriptions status count
  getPharmacyPrescriptionsStatusCount(pharmacyId: number): Observable<any> {
    const url = `GetPharmacyPrescriptionsStatusCount?pharmacyId=${pharmacyId}`;
    return this.apiService.getData(url);
  }
  // Get pharmacy prescriptions by status
  getUserProfile(): Observable<any> {
    const url = `UserProfile`;
    return this.apiService.getData(url);
  }
}
