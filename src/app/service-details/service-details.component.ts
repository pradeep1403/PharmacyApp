import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { RouterModule } from '@angular/router';
import { PharmacyService } from '../services/pharmacy.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, InputTextModule, RadioButtonModule, DropdownModule, CalendarModule, ButtonModule,
    FormsModule, ReactiveFormsModule, CheckboxModule, MultiSelectModule,RouterModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})

export class ServiceDetailsComponent {
  gpo: { name: string; code: string }[] = [];
  states: { name: string; code: string }[] = [];
  accreditations: { name: string; code: string }[] = [];
  services: { name: string; key: string }[] = [];
  shipings: { name: string; key: string; }[] = [];
  days: { name: string; key: string }[] = [];
  deliveryService: { name: string; key: string }[] = [];
  deliveryOptions: { name: string; key: string }[] = [];
  showmailorder: boolean = false;
  yes!: string;
  no!: string;
  serviceDetailsForm!: FormGroup;
  submittab: boolean = false;  
  @Output() servicedetailsgroup = new EventEmitter<FormGroup>();
  @Output() activeindex = new EventEmitter<number>();
  @ViewChild('expiryDate') expiryDate!: Calendar; 

  constructor(private fb: FormBuilder,private pharmacyService: PharmacyService) { }
  ngOnInit() {
    this.Initializeform();
    this.Setdropdownvalues();

    this.serviceDetailsForm.get('offerdelivery')?.valueChanges.subscribe(value => {
      this.onDeliveryTypeChange(value, 'delivery');
    });

    this.serviceDetailsForm.get('deliveryServices')?.valueChanges.subscribe(value => {
      this.onDeliveryTypeChange(value, 'services');
    });

    this.serviceDetailsForm.get('shipRxOrders')?.valueChanges.subscribe(value => {
      this.onDeliveryTypeChange(value, 'shiping');
    });

    this.addNewLicense();
  }

  openTermsAndConditions(event: Event) {
    event.preventDefault();
    window.open('https://www.example.com/terms-and-conditions', '_blank', 'noopener,noreferrer');
  }
  Initializeform() {
    this.serviceDetailsForm = this.fb.group({
      servicesoffered: this.fb.array([], Validators.required),
      offerdelivery: [null],
      deliverydays: new FormControl<any[] | null>([]),
      starttime: [null],
      endtime: [null],
      pharmacyDeliveryBoundary: [''],
      deliveryServices: [null],
      deliveryServiceMethod: [null],
      carriername: [''],
      pharmacyLocationNotes: [''],
      shipRxOrders: [null], // RadioButton Validation
      preferredShippingCarrier: this.fb.array([]),
      workersCompensation: ['', Validators.required],
      medicaidContracted: ['', Validators.required],
      medicareContracted: ['', Validators.required],
      contractRestrictionDetails: [''],
      pharmacyAccreditations: new FormControl<any[] | null>([], Validators.required),
      gpo: new FormControl<any[] | null>([]),
      additionalLicenses: this.fb.array([]),
      terms: new FormControl(false)
    });
  }

  Setdropdownvalues() {
    this.states = [
      { name: 'Alabama', code: 'AL' },
      { name: 'Alaska', code: 'AK' },
      { name: 'Arizona', code: 'AZ' },
      { name: 'Arkansas', code: 'AR' },
      { name: 'California', code: 'CA' },
      { name: 'Colorado', code: 'CO' },
      { name: 'Connecticut', code: 'CT' },
      { name: 'Delaware', code: 'DE' },
      { name: 'Florida', code: 'FL' },
      { name: 'Georgia', code: 'GA' },
      { name: 'Hawaii', code: 'HI' },
      { name: 'Idaho', code: 'ID' },
      { name: 'Illinois', code: 'IL' },
      { name: 'Indiana', code: 'IN' },
      { name: 'Iowa', code: 'IA' },
      { name: 'Kansas', code: 'KS' },
      { name: 'Kentucky', code: 'KY' },
      { name: 'Louisiana', code: 'LA' },
      { name: 'Maine', code: 'ME' },
      { name: 'Maryland', code: 'MD' },
      { name: 'Massachusetts', code: 'MA' },
      { name: 'Michigan', code: 'MI' },
      { name: 'Minnesota', code: 'MN' },
      { name: 'Mississippi', code: 'MS' },
      { name: 'Missouri', code: 'MO' },
      { name: 'Montana', code: 'MT' },
      { name: 'Nebraska', code: 'NB' },
      { name: 'Nevada', code: 'NV' },
      { name: 'New Hampshire', code: 'NH' },
      { name: 'New Jersey', code: 'NJ' },
      { name: 'New Mexico', code: 'NM' },
      { name: 'New York', code: 'NY' },
      { name: 'North Carolina', code: 'NC' },
      { name: 'North Dakota', code: 'ND' },
      { name: 'Ohio', code: 'OH' },
      { name: 'Oklahoma', code: 'OK' },
      { name: 'Oregon', code: 'OR' },
      { name: 'Pennsylvania', code: 'PA' },
      { name: 'Rhode Island', code: 'RI' },
      { name: 'South Carolina', code: 'SC' },
      { name: 'South Dakota', code: 'SD' },
      { name: 'Tennessee', code: 'TN' },
      { name: 'Texas', code: 'TX' },
      { name: 'Utah', code: 'UT' },
      { name: 'Vermont', code: 'VT' },
      { name: 'Virginia', code: 'VA' },
      { name: 'Washington', code: 'WA' },
      { name: 'West Virginia', code: 'WV' },
      { name: 'Wisconsin', code: 'WI' },
      { name: 'Wyoming', code: 'WY' }
    ];

    this.pharmacyService.getconfigurationdata("GPO").subscribe({
      next: (response) => {
        if(response!=null)
          {
            this.gpo=response;
          }         
        },
      error: (err) => {       
        console.error('Error fetching posts:', err)}
    });     

    this.pharmacyService.getconfigurationdata("Accreditations").subscribe({
      next: (response) => {         
          if(response!=null)
          {
            this.accreditations=response;
          }         
        },
      error: (err) => {       
        console.error('Error fetching posts:', err)}
    }); 
    
    this.shipings = [
      { name: 'FedEx', key: 'A' },
      { name: 'UPS', key: 'M' },
      { name: 'USPS', key: 'P' },
      { name: 'Not at this time', key: 'R' }
    ];

    this.services = [
      { name: 'Retail', key: 'R' },
      { name: 'Mail Order', key: 'M' },
      { name: 'Compounding', key: 'C' }
    ];

    this.days = [
      { name: 'Mon', key: 'M' },
      { name: 'Tue', key: 'Tu' },
      { name: 'Wed', key: 'W' },
      { name: 'Thu', key: 'Th' },
      { name: 'Fri', key: 'F' },
      { name: 'Sat', key: 'Sa' },
      { name: 'Sun', key: 'Su' }
    ];

    this.deliveryService = [
      { name: 'In House driver', key: 'HD' },
      { name: 'Third party delivery carrier', key: 'DC' }
    ];

    this.deliveryOptions = [
      { name: 'Yes', key: 'Y' },
      { name: 'No', key: 'N' }
    ];

  }

  get additionalLicenses(): FormArray {
    return this.serviceDetailsForm.get('additionalLicenses') as FormArray;
  }

  addNewLicense() {
    const licenseForm = this.fb.group({
      state: [null],
      licenseNumber: [null],
      expiryDate: [null]
    });
    this.additionalLicenses.push(licenseForm);
  }

  removeLicense(index: number) {
    this.additionalLicenses.removeAt(index);
  }

  getSelectedServices(): string {
    return this.serviceDetailsForm.value.servicesoffered.map((service: any) => service.name).join(', ');
  }

  getSelectedShiping(): string {
    return this.serviceDetailsForm.value.preferredShippingCarrier.map((shiping: any) => shiping.name).join(', ');
  }


  get servicesoffered(): FormArray {
    return this.serviceDetailsForm.get('servicesoffered') as FormArray;
  }

  get shipingoffered(): FormArray {
    return this.serviceDetailsForm.get('preferredShippingCarrier') as FormArray;
  }

  getCheckboxControl(service: any): FormControl {
    return new FormControl(this.servicesoffered.value.includes(service));
  }

  getCheckboxshipControl(shiping: any): FormControl {
    return new FormControl(this.shipingoffered.value.includes(shiping));
  }

  onShipingChange(shiping: any, event: any) {
    this.shipingoffered.get(shiping.name)?.setValue(event.checked);
  }

  onshipingChange(shiping: any) {
    const shipingArray = this.shipingoffered;
    const index = shipingArray.controls.findIndex(control => control.value === shiping);

    if (index > -1) {
      shipingArray.removeAt(index); // Remove if already selected
    } else {
      shipingArray.push(new FormControl(shiping)); // Add if not selected
    }
  }

  onServiceChange(service: any) {
    const servicesArray = this.servicesoffered;
    const index = servicesArray.controls.findIndex(control => control.value === service);

    if (index > -1) {
      servicesArray.removeAt(index); // Remove if already selected
    } else {
      servicesArray.push(new FormControl(service)); // Add if not selected
    }
    let mailservice = this.services.filter(service => service.name == 'Mail Order');
    if (this.serviceDetailsForm.value.servicesoffered.includes(mailservice[0]))
      this.showmailorder = true;
    else
      this.showmailorder = false;
  }

  onDeliveryTypeChange(event: any, type: string) {
    this.updateValidators(event, type);
  }

  updateValidators(event: any, deliveryType: string) {
    this.submittab = false;
    if (deliveryType === 'delivery') {
      const deliveryControl = this.serviceDetailsForm.get('deliverydays');
      const starttimeControl = this.serviceDetailsForm.get('starttime');
      const endtimeControl = this.serviceDetailsForm.get('endtime');
      const boundaryControl = this.serviceDetailsForm.get('pharmacyDeliveryBoundary');
      const serviceControl = this.serviceDetailsForm.get('deliveryServiceMethod');
      const carrierControl = this.serviceDetailsForm.get('carriername');
      if (event.name == 'Yes') {
        deliveryControl?.setValidators([Validators.required]);
        starttimeControl?.setValidators([Validators.required]);
        endtimeControl?.setValidators([Validators.required]); // Add required validator
        boundaryControl?.setValidators([Validators.required]);
      } else {
        deliveryControl?.clearValidators();
        deliveryControl?.setValue('');
        starttimeControl?.clearValidators();
        starttimeControl?.setValue('');
        endtimeControl?.clearValidators(); // Remove required validator
        endtimeControl?.setValue('');
        boundaryControl?.clearValidators();
        boundaryControl?.setValue('');
        serviceControl?.setValue('');
        carrierControl?.setValue('');
      }

      deliveryControl?.updateValueAndValidity();
      starttimeControl?.updateValueAndValidity();
      endtimeControl?.updateValueAndValidity();
      boundaryControl?.updateValueAndValidity();
    } // Update form control validity
    else if (deliveryType === 'services') {
      const locationnotesControl = this.serviceDetailsForm.get('pharmacyLocationNotes');
      if (event.name == 'Yes') {
        locationnotesControl?.setValidators([Validators.required]);
      } else {
        locationnotesControl?.clearValidators();
        locationnotesControl?.setValue('');
        }
      locationnotesControl?.updateValueAndValidity();
    }
    else if (deliveryType === 'shiping') {      
      if (event!=null && event.name == 'Yes') {
        this.shipingoffered?.setValidators([Validators.requiredTrue]);
      } else {
        this.shipingoffered?.clearValidators();
        this.shipingoffered?.clear();
      }
      this.shipingoffered?.updateValueAndValidity();
    }
  }

  OnnextPage() {     
    if (this.shipingoffered.value.length>0) {     
      this.shipingoffered?.clearValidators();
      this.shipingoffered?.updateValueAndValidity();
    }
    if (!this.serviceDetailsForm.valid) {
      Object.keys(this.serviceDetailsForm.controls).forEach(field => {

        const control = this.serviceDetailsForm.get(field);
        if (control && control.invalid) {          
        //  console.log(`Field "${field}" is invalid. Errors:`, control.errors);
        }
      });
      this.serviceDetailsForm.markAllAsTouched(); // Highlight errors
      this.submittab = true;
    } else {      
      if(this.serviceDetailsForm.get('pharmacyDeliveryBoundary')?.value=="")
        this.serviceDetailsForm.get('pharmacyDeliveryBoundary')?.setValue(0);      
      if(this.serviceDetailsForm.get('deliverydays')?.value=="")
        this.serviceDetailsForm.get('deliverydays')?.setValue(null);
      if(this.serviceDetailsForm.get('starttime')?.value=="")
        this.serviceDetailsForm.get('starttime')?.setValue(null);
      if(this.serviceDetailsForm.get('endtime')?.value=="")
        this.serviceDetailsForm.get('endtime')?.setValue(null);
      if(this.serviceDetailsForm.get('deliveryServiceMethod')?.value=="")
        this.serviceDetailsForm.get('deliveryServiceMethod')?.setValue(null);
      if(this.serviceDetailsForm.get('shipRxOrders')?.value=="")
        this.serviceDetailsForm.get('shipRxOrders')?.setValue(null);
      if(this.serviceDetailsForm.get('additionalLicenses')?.value.length==1)
      {
        if(this.serviceDetailsForm.get('additionalLicenses')?.value[0].state==null && this.serviceDetailsForm.get('additionalLicenses')?.value[0].licenseNumber==null && this.serviceDetailsForm.get('additionalLicenses')?.value[0].expiryDate==null)
        this.removeLicense(0);
      }
        console.log(this.serviceDetailsForm);
      this.servicedetailsgroup.emit(this.serviceDetailsForm);
      this.submittab = false;
    }
  }

  OnPreviousPage() {
    this.activeindex.emit(2);
    this.submittab = false;
  }
  onDateSelect(event: any, calendar: any) {
    calendar.hideOverlay();
  }
}
