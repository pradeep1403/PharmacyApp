import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InsuranceContractDetails, PharmacistInformation, PharmacyDetails, PharmacyInformation, ServiceDetails, StoreHours } from '../models/Pharmacy-details';
import { PharmacyService } from '../services/pharmacy.service';
import { PharmacydetailsComponent } from '../pharmacydetails/pharmacydetails.component';
import { PharmacistInformationComponent } from '../pharmacist-information/pharmacist-information.component';
import { StorageHoursComponent } from '../storage-hours/storage-hours.component';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { InsuranceContractComponent } from '../insurance-contract/insurance-contract.component';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoaderService } from '../services/loaderService';

@Component({
  selector: 'app-pharmacy-form',
  standalone: true,
  imports: [CommonModule, TabViewModule, CardModule, InputTextModule, InputTextareaModule, CheckboxModule,
    ButtonModule, DropdownModule, CalendarModule, FieldsetModule, FormsModule, RadioButtonModule, MessagesModule,
    ReactiveFormsModule, PharmacydetailsComponent, PharmacistInformationComponent, StorageHoursComponent, ServiceDetailsComponent, InsuranceContractComponent],
  templateUrl: './pharmacy-form.component.html',
  styleUrl: './pharmacy-form.component.scss'
})

export class PharmacyFormComponent implements AfterViewInit {
  pharmacyDetails: PharmacyDetails | null = null;
  pharmacistInformation: PharmacistInformation | null = null;
  storeHours: StoreHours | null = null;
  servicedetails: ServiceDetails | null = null;
  insurancecontract: InsuranceContractDetails | null = null;
  pharmacyInformation: PharmacyInformation | null = null;
  pharmacyDetailForm!: FormGroup;
  pharmacistInformationForm!: FormGroup;
  serviceDetailsForm!: FormGroup;
  storehoursForm!: FormGroup;
  activeIndex: number = 0;
  submitflag: boolean = false;
  submitpharmacistflag: boolean = false;
  ncpdpduplicate: boolean = false;
  messages: Message[] = [{ severity: 'info', detail: 'Message Content' }];
  errormessage: Message[] = [{ severity: 'info', detail: 'Message Content' }];
  message: string = '';
  addressflag: boolean = false;
  safeMessage: SafeHtml = '';
  @ViewChild(PharmacydetailsComponent) PharmacydetailsComponent!: PharmacydetailsComponent;
  @ViewChild(PharmacistInformationComponent) PharmacistInformationComponent!: PharmacistInformationComponent;
  @ViewChild(StorageHoursComponent) StorageHoursComponent!: StorageHoursComponent;
  constructor(private fb: FormBuilder, private pharmacyService: PharmacyService, private router: Router, private sanitizer: DomSanitizer, 
    private loaderService: LoaderService) {
  }
  ngOnInit() {
    this.pharmacyService.getconfigurationdata("Registration").subscribe({
      next: (response) => { 
          if(response!=null && response[0].code=='NCPDP')
          {
            this.message = response[0].name;
            this.safeMessage = this.sanitizer.bypassSecurityTrustHtml(this.message);
          }         
        },
      error: (err) => {       
        console.error('Error fetching posts:', err)}
    }); 
  }

  ngAfterViewInit(): void {
    // Access child component's method after view initialization
    // console.log(this.childComponent.greet());
  }

  pharmacydetailsgroupData(event: FormGroup) {
    this.ncpdpduplicate = false;
    this.pharmacyDetailForm = event;
    const pharmacyDetails: PharmacyDetails = this.pharmacyDetailForm.value as PharmacyDetails;
    this.pharmacyDetails = pharmacyDetails;
    if (this.activeIndex === 0)
      this.activeIndex = 1;
  }

  servicedetailsgroupData(event: FormGroup) {
    this.serviceDetailsForm = event;
    const serviceDetails: ServiceDetails = this.serviceDetailsForm.value as ServiceDetails;
    this.servicedetails = serviceDetails;
    this.onSubmit();
  }

  ncpdpflagData(event: boolean) {
    this.ncpdpduplicate = event;
    this.messages = [{ severity: 'info', detail: this.message }];
    this.activeIndex = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  storehoursgroupData(event: any) {
    console.log(event);
    this.storehoursForm = event as FormGroup;
    const storehours: StoreHours = this.storehoursForm.value as StoreHours;
    storehours.holidays = storehours.holidays.filter(holiday => holiday.selected);
    storehours.days = storehours.days.filter(day => day.open);
    this.storeHours = storehours;
  }

  pharmacistgroupData(event: FormGroup) {
    this.pharmacistInformationForm = event;
    const pharmacistinfo: PharmacistInformation = this.pharmacistInformationForm.value as PharmacistInformation;
    this.pharmacistInformation = pharmacistinfo;
  }

  activeindexData(event: number) {
    (this.activeIndex as any) = null;
    setTimeout(() => {
      this.activeIndex = event;     
  });
  
  }

  addressflagevent(event: boolean) {
    this.addressflag = event;
  }

  onTabChange(event: any): void {    
    // if (event.index == 1)
    //   this.PharmacydetailsComponent.OnnextPage();
    // else if (event.index == 2) {
    //   this.PharmacydetailsComponent.OnnextPage();
    //   this.PharmacistInformationComponent.OnNextPage();
    //   if (this.pharmacyDetailForm == null) {
    //     this.submitflag = true;       
    //     this.activeIndex = 0;
    //   }
    //   else if (this.pharmacistInformationForm == null)
    //     this.submitpharmacistflag = true;
    // }
     if (event.index == 3) {
      this.PharmacydetailsComponent.OnnextPage();
      this.PharmacistInformationComponent.OnNextPage();
      this.StorageHoursComponent.onNextClick();
    }
    if (this.activeIndex != 0)
      this.ncpdpduplicate = false;
    console.log('Tab changed:', event.index); // Logs the index of the active tab
    this.setTabVisibility(event.index);
  }

  setTabVisibility(activeTabIndex: number): void {
    const tabs = document.querySelectorAll('[role="tabpanel"]');
    tabs.forEach((tab, index) => {
      const isActive = index === activeTabIndex;
      tab.setAttribute('aria-hidden', (!isActive).toString());
      if (!isActive) {
        tab.setAttribute('hidden', '');
      } else {
        tab.removeAttribute('hidden');
      }
    });
  }
  

  onSubmit() {
    this.addressflag = false;
    if (this.pharmacyDetailForm == null) {
      this.submitflag = true;
      this.activeIndex = 0;
    }
    else if (this.pharmacistInformationForm == null) {
      this.submitpharmacistflag = true;
      this.activeIndex = 1;
    }
    else {
      if (!this.pharmacyDetailForm.valid) {
        this.pharmacyDetailForm.markAllAsTouched();
        this.submitflag = true;
        this.activeIndex = 0;
      }
      else if (!this.pharmacistInformationForm.valid) {
        this.pharmacistInformationForm.markAllAsTouched();
        this.submitpharmacistflag = true;
        this.activeIndex = 1;
      }
      else if (!this.serviceDetailsForm.valid) {
        this.serviceDetailsForm.markAllAsTouched();
      }
      else {
        this.pharmacyInformation = {
          pharmacyDetails: this.pharmacyDetails as PharmacyDetails,
          pharmacistInformation: this.pharmacistInformation as PharmacistInformation,
          storeHours: this.storeHours as StoreHours,
          serviceDetails: this.servicedetails as ServiceDetails,
          insuranceContract: this.insurancecontract as InsuranceContractDetails
        };
        this.submitflag = false;
        this.addressflag = false;
        console.log(this.pharmacyInformation);
        this.loaderService.show();
        this.pharmacyService.getpharmacydata(this.pharmacyInformation?.pharmacyDetails?.ncpdp).subscribe({
          next: (response) => {
            if (response != null && response.ncpdp == this.pharmacyInformation?.pharmacyDetails?.ncpdp) {
              this.ncpdpduplicate = true;
              this.messages = [{ severity: 'info', detail: 'There is already a Pharmacy registered with the same NCPDP Number' }];
              this.activeIndex = 0;
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else {
              this.pharmacyService.sendPharmacyData(this.pharmacyInformation).subscribe({
                next: (response) => {
                  this.loaderService.hide();
                  console.log('Success:', response);
                  if (response.message == "Pharmacy created successfully")
                    this.router.navigate(['/registrationsuccess']);
                  else if (response.code = 'Invalid Address') {
                    this.addressflag = true;
                    this.activeIndex = 0;
                    this.errormessage = [{ severity: 'error', detail: response.code }];
                  }
                },
                error: (error) => {
                  console.error('Error:', error)
                  this.loaderService.hide();
                },
              });
            }
          },
          error: (err) => {
            this.loaderService.hide();
            console.error('Error fetching posts:', err)}
        });        
      }
    }
  }
}


