
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipsModule } from 'primeng/chips';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DashboardService } from '../services/dashboard.service'
import { Auth0Service } from '../services/Auth0.service'
import { UserProfile } from '../models/Auth0-details';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { LoaderService } from '../services/loaderService';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, AvatarModule, BadgeModule, OverlayPanelModule, ChipsModule, CommonModule, CardModule, TableModule, TagModule, RatingModule, SideMenuComponent,ToastModule],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  products: any[] = [];
  inQueueCount: Number = 10;
  expiringCount: Number = 4;
  totalQueueCount: Number = 10;
  SLACount: Number = 2;
  TotalSLA: Number = 6;
  inprocessCount: Number = 5;
  completedCount: Number = 6;
  completedPercentage: Number = 26.42;
  rejectedCount: Number = 7;
  rejectedPercentage: Number = 13.42;
  pharmacies: any;
  activeStatus: string = '';
  userProfile?: UserProfile;
  constructor(private dashboardService: DashboardService, private auth0Service: Auth0Service, private loaderService: LoaderService,private messageService: MessageService) { }

 
  ngOnInit() {
    //this.getDashboardData();
    //this.loaderService.show();
    this.getUserProfile();
    this.getPharmacyPrescriptionsStatusCount()
    this.activeStatus = 'In-Queue';
    this.getPharmacyPrescriptionsByStatus('InQueue');
    //this.loaderService.hide();
  }
   
  // Fetch the dashboard data when the component loads
  getDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (response) => {
        this.inQueueCount = response.inQueueCount;
        this.expiringCount = response.expiringCount;
        this.totalQueueCount = response.totalQueueCount;
        this.SLACount = response.SLACount;
        this.TotalSLA = response.TotalSLA;
        this.inprocessCount = response.inprocessCount;
        this.completedCount = response.completedCount;
        this.completedPercentage = response.completedPercentage;
        this.rejectedCount = response.rejectedCount;
        this.rejectedPercentage = response.rejectedPercentage;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }
  LogOut(event: MouseEvent | KeyboardEvent) {
    event.preventDefault();
    window.location.href = this.auth0Service.generateLogOutURL();
  }

  // Get pharmacy prescriptions status count
  getPharmacyPrescriptionsStatusCount() {
    this.loaderService.show();
    this.dashboardService.getPharmacyPrescriptionsStatusCount(2).subscribe({
      next: (response) => {
        this.inQueueCount = response.inQueueCount;
        this.inprocessCount = response.inProcessCount;
        this.rejectedCount = response.rejectandExpiredCount;
        this.completedCount = response.completedCount;
        this.expiringCount = response.soonExpiryCount;
        this.SLACount = response.slaInprocessCount;
        this.loaderService.hide();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.loaderService.hide();
      }
    })

  }

  // Update pharmacy prescription status
  updatePharmacyPrescriptionStatus(id: number, status: string): void {
    this.loaderService.show();
    this.dashboardService.updatePharmacyPrescriptionStatus(status, id, this.userProfile?.lastName+' '+this.userProfile?.firstName).subscribe({
      next: (response) => {
        console.log('Prescription status updated successfully:', response);        
        status=status=='InProcess'?'Accepted':status;
        let message='The Prescription Successfully '+status;
        this.getPharmacyPrescriptionsStatusCount();
        this.activeStatus =this.activeStatus .replace('-','');
       // this.activeStatus = 'In-Queue';
        this.getPharmacyPrescriptionsByStatus(this.activeStatus);
        this.messageService.add({ severity: 'info', summary: message, detail: '', life: 3000 });      
        this.loaderService.hide();
      },
      error: (error) => {
        console.error('Error updating prescription status:', error);
        this.loaderService.hide();
      }
    });
  }

  // Get pharmacy prescriptions by status
  getPharmacyPrescriptionsByStatus(status: string): void {
    this.loaderService.show();
    this.dashboardService.getPharmacyPrescriptionsByStatus(status, 2).subscribe({
      next: (response) => {
        console.log('Prescriptions fetched successfully:', response);
        this.pharmacies = response;
        this.loaderService.hide();
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Error fetching prescriptions:', error);
      }
    });
  }

  onHeaderClick(status: string) {
    this.activeStatus = status;
    status=status.replace('-','');
    this.getPharmacyPrescriptionsByStatus(status);
    console.log('Header clicked!');
  }
  getUserProfile(){
  this.userProfile = JSON.parse( this.auth0Service.getUserProfileFromStorage()?? "");
  }
}
