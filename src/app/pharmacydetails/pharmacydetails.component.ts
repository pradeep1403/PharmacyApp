import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PharmacyDetails } from '../models/Pharmacy-details';
import { InputNumberModule } from 'primeng/inputnumber';
import { PharmacyService } from '../services/pharmacy.service';
import { LoaderService } from '../services/loaderService';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-pharmacydetails',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, DropdownModule, CalendarModule, CheckboxModule, ReactiveFormsModule,
     CommonModule, FormsModule,InputNumberModule,InputMaskModule ],
  templateUrl: './pharmacydetails.component.html',
  styleUrl: './pharmacydetails.component.css'
})
export class PharmacydetailsComponent {
  states: { name: string; code: string }[] = [];
  pms: { name: string; code: string }[] = [];
  pmstransfermethods: { name: string; code: string }[] = [];
  pharmacyDetailForm!: FormGroup;   
  @Output() ncpdpflag = new EventEmitter<boolean>();
  @Output() pharmacydetailsgroup = new EventEmitter<FormGroup>();
  @Output() activeindex = new EventEmitter<number>();
  @Input() submittab: boolean=false; 
  @ViewChild('deaExpCalendar') deaExpCalendar!: Calendar; 
  @ViewChild('licenseExpDate') licenseExpDate!: Calendar; 
  @Output() addresserror=new EventEmitter<boolean>();
  constructor(private fb: FormBuilder,private pharmacyService: PharmacyService,private loaderService: LoaderService) {    
  }

  ngOnInit() {
    this.Initializeform();
    this.Setdropdownvalues();
  }

  ngOnChanges(changes: SimpleChanges) {    
    if (changes['submittab'] && this.pharmacyDetailForm!=null) {
      if(this.submittab==true)
        this.pharmacyDetailForm.markAllAsTouched();
    }
  }

  Initializeform() {
    this.pharmacyDetailForm = this.fb.group({
      legalName: ['', Validators.required],
      legalBusinessName: ['', Validators.required],
      ncpdp: [null, [Validators.required, Validators.pattern(/^\d{7}$/)]], // Corrected: Wrap pattern in an array
      npi: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]], // NPI: 10-digit number
      deaNumber: [''],
      deaExpDate: [''],
      stateLicenseNumber: ['', Validators.required],
      licenseExpiryDate: ['', Validators.required],
      medicareProviderId: [''],      
      storeNumber: [''],     
      pmsSystem: ['', Validators.required],
      otherpmssystem: [''],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]], // Postal Code: 5-digit number
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/)]], // Phone: 10-digit number
      fax: ['', [Validators.required, Validators.pattern(/^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/)]], // Fax: 10-digit number
      notes: ['']
    });
  }

  Setdropdownvalues(){
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

    this.pharmacyService.getconfigurationdata("PMS").subscribe({
      next: (response) => {         
          if(response!=null)
          {
            this.pms=response;
          }         
        },
      error: (err) => {       
        console.error('Error fetching posts:', err)}
    }); 

    this.pms = [
      { name: 'BestRX', code: 'BR' },
      { name: 'BestRxCardinal', code: 'BC' },
      { name: 'Computer-Rx', code: 'CR' },
      { name: 'DAA', code: 'DAA' },
      { name: 'Datascan', code: 'DS' },
      { name: 'DigitalRx', code: 'DR' },
      { name: 'FSI', code: 'FSI' },
      { name: 'HBSRx', code: 'HR' },
      { name: 'Lagniappe', code: 'LA' },
      { name: 'Liberty', code: 'LI' },
      { name: 'Mckesson', code: 'MC' },
      { name: 'Micro Merchant (MMS)', code: 'MMS' },
      { name: 'Other', code: 'OT' }

    ];

    this.pmstransfermethods=[
      { name: 'Electronic Data Interchange (EDI)', code: 'EDI' },
      { name: 'Secure FTP (SFTP)', code: 'SFTP' },
      { name: 'Web Services / API (REST & SOAP)', code: 'REST & SOAP' },
      { name: 'HL7 Messaging', code: 'HL7' },
      { name: 'Fax (Legacy Systems)', code: 'FAX' },
      { name: 'Email', code: 'Email' },
      { name: 'Direct Secure Messaging (DirectTrust)', code: 'DirectTrust' },
      { name: 'VPN / Private Network Connection', code: 'VPN' }

    ];
  }

  onFocus(event: FocusEvent): void {
   this.addresserror.emit(false);
  }


  OnnextPage() { 
    if (!this.pharmacyDetailForm.valid) {
      Object.keys(this.pharmacyDetailForm.controls).forEach(field => {

        const control = this.pharmacyDetailForm.get(field);
        if (control && control.invalid) {          
          console.log(`Field "${field}" is invalid. Errors:`, control.errors);
        }
      });
      this.pharmacyDetailForm.markAllAsTouched();// Highlight errors     
      this.activeindex.emit(0);
      this.submittab=true;      
    } else {
      if(this.pharmacyDetailForm.get('deaExpDate')?.value=="")
        this.pharmacyDetailForm.get('deaExpDate')?.setValue(null);
      const pharmacyDetails: PharmacyDetails = this.pharmacyDetailForm.value as PharmacyDetails;  
      this.pharmacyDetailForm.value.phoneNumber=this.cleanPhoneNumber(this.pharmacyDetailForm.value.phoneNumber);
      this.pharmacyDetailForm.value.fax=this.cleanPhoneNumber(this.pharmacyDetailForm.value.fax);
      this.loaderService.show();   
      this.pharmacyService.getpharmacydata(pharmacyDetails.ncpdp).subscribe({
        next: (response) => {    
          this.loaderService.hide();                
            if(response!=null && response.ncpdp==pharmacyDetails.ncpdp)
            {
              this.ncpdpflag.emit(true); 
            }
            else
            {
              this.pharmacyDetailForm.value.phoneNumber=this.cleanPhoneNumber(this.pharmacyDetailForm.value.phoneNumber);
              this.pharmacyDetailForm.value.fax=this.cleanPhoneNumber(this.pharmacyDetailForm.value.fax);
              this.pharmacydetailsgroup.emit(this.pharmacyDetailForm);
              this.activeindex.emit(1);  
              this.submittab=false; 
            }
          },
        error: (err) => {
          this.loaderService.hide();  
          console.error('Error fetching posts:', err)}
      }); 
    }
  }

  onDropdownChange(event: any): void {    
    const otherpmsControl = this.pharmacyDetailForm.get('otherpmssystem');
   if(event!=null && event.value.name=="Other")
    otherpmsControl?.setValidators([Validators.required]);
   else
   {
    otherpmsControl?.clearValidators();
    otherpmsControl?.setValue('');
   }
   otherpmsControl?.updateValueAndValidity();
  }

  cleanPhoneNumber(phone: string): string {
    return phone.replace(/[\(\)\s-]/g, '');
  }

  onDateSelect(event: any, calendar: any) {
    calendar.hideOverlay();
  }
  
}



