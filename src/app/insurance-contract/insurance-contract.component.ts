import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


interface PSAO {
  name: string;
  code: string;
}

interface wholesalers {
  name: string;
  code: string;
}
@Component({
  selector: 'app-insurance-contract',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, CheckboxModule,
      ButtonModule, DropdownModule, CommonModule],
  templateUrl: './insurance-contract.component.html',
  styleUrl: './insurance-contract.component.css'
})

export class InsuranceContractComponent {
   psao: PSAO[] | undefined;
    
    shippbm: PSAO[] | undefined;
    pbmcontract: PSAO[] | undefined;
    wholesalers: wholesalers[] | undefined;
    insuranceContractForm!: FormGroup;
    insuranceplans: any[] = [
      { name: 'Caremark', key: 'A' },
      { name: 'Express Scripts (ESI)', key: 'M' },
      { name: 'Optum', key: 'M' }
    ];
  
    reporting: any[] = [
      { name: 'IQVIA (formerly IMS)', key: 'A' },
      { name: 'Symphony (PRA Health)', key: 'M' }
    ];
   constructor(private fb: FormBuilder) { }
    ngOnInit() {
       this.psao = [
            { name: 'PPOK (Independent)', code: 'BR' },
            { name: 'AlignRxElevate (ABC)', code: 'RD' },
            { name: 'Atlas (McKesson)', code: 'DR' },
            { name: 'EPIC (Cardinal)', code: 'HMA' },
            { name: 'Not Applicable', code: 'DPA' },
            { name: 'Other', code: 'DPA' }
      
          ];
      
         
      
          this.shippbm = [
            { name: 'Aetna', code: 'URAC' },
            { name: 'Anthem', code: 'ACHC' },
            { name: 'Blue Cross Blue Shield', code: 'PCAB' },
            { name: 'Cigna', code: 'HMA' },
            { name: 'CVS/Caremark', code: 'DPA' },
            { name: 'Express Scripts (ESI)', code: 'URAC' },
            { name: 'Humana', code: 'ACHC' },
            { name: 'MedImpact', code: 'PCAB' },
            { name: 'Optum', code: 'HMA' },
            { name: 'Prime Therapeutics', code: 'URAC' },
            { name: 'United Healthcare', code: 'ACHC' },
            { name: 'No, cannot ship with retail contract', code: 'PCAB' },
            { name: 'Other, etc', code: 'HMA' }
          ];
      
          this.pbmcontract = [
            { name: 'Aetna', code: 'URAC' },
            { name: 'Anthem', code: 'ACHC' },
            { name: 'Blue Cross Blue Shield', code: 'PCAB' },
            { name: 'Cigna', code: 'HMA' },
            { name: 'CVS/Caremark', code: 'DPA' },
            { name: 'Express Scripts (ESI)', code: 'URAC' },
            { name: 'Humana', code: 'ACHC' },
            { name: 'MedImpact', code: 'PCAB' },
            { name: 'Optum', code: 'HMA' },
            { name: 'Prime Therapeutics', code: 'URAC' },
            { name: 'United Healthcare', code: 'ACHC' },
            { name: 'No, cannot ship with retail contract', code: 'PCAB' },
            { name: 'Other, etc', code: 'HMA' }
          ];
      
          this.wholesalers = [
            { name: 'Primary', code: 'URAC' },
            { name: 'Secondary', code: 'ACHC' },
            { name: 'Purchasing with Wellgistics, any concerns or contract limitations', code: 'PCAB' },
            { name: 'Primary contract restrictions', code: 'HMA' }
          ];
          this.insuranceContractForm = this.fb.group({
            psaoAffiliation: [''],
            reporting: this.fb.array(new Array(this.reporting.length).fill(false)), // Checkbox array
            pbmContracts: ['', Validators.required],      
            shippingRetailPbmContract: [''],
            dispensingFeesTerms: ['', Validators.required],
            wholesalersInfo: ['', Validators.required]
          });
    }


 
}
