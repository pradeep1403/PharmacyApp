import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-pharmacist-information',
  standalone: true,
  imports: [CommonModule, TabViewModule, CardModule, InputTextModule, InputTextareaModule, CheckboxModule,InputMaskModule,
    ButtonModule, DropdownModule, CalendarModule, FieldsetModule, FormsModule, RadioButtonModule, ReactiveFormsModule],
  templateUrl: './pharmacist-information.component.html',
  styleUrls: ['./pharmacist-information.component.css']
})
export class PharmacistInformationComponent implements OnInit {
  pharmacistInformationForm!: FormGroup;
  roles: { label: string; value: string; }[] | undefined;
  @Output() pharmacistgroup = new EventEmitter<FormGroup>();
  @Output() activeindex = new EventEmitter<number>();
  @Input() submitpharmacist: boolean=false; 
  primaryContactOptions: { label: string; value: boolean; key: string; }[] | undefined;
  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    this.addNewPharmacist(); // Initialize with one default form
    this.roles = [
      { label: 'Manager', value: 'manager' },
      { label: 'Staff Pharmacist', value: 'staff_pharmacist' },
      { label: 'Technician', value: 'technician' }
    ];
  }
 
 ngOnChanges(changes: SimpleChanges) {    
    if (changes['submitpharmacist'] && this.pharmacistInformationForm!=null) {
      if(this.submitpharmacist==true)
        this.pharmacistInformationForm.markAllAsTouched();
    }
  }

  initializeForm() {
    this.pharmacistInformationForm = this.fb.group({
      pharmacists: this.fb.array([])
    });
  }

  get pharmacists() {
    return this.pharmacistInformationForm.get('pharmacists') as FormArray;
  }

  addNewPharmacist(){
    let pharmacistForm= this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      initials: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      isPharmacyContact: [],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/)]], // Phone: 10-digit number
      role: ['', [Validators.required]]
    });
    this.pharmacists.push(pharmacistForm);
  }
  removePharmacist(index: number) {
    this.pharmacists.removeAt(index);
    console.log('Pharmacist Removed', this.pharmacistInformationForm);
  }

  
  
  OnNextPage() {    
    if (this.pharmacistInformationForm.valid) {
      const formData = this.pharmacistInformationForm.value.pharmacists;
      this.pharmacistgroup.emit(this.pharmacistInformationForm);
      this.activeindex.emit(2);  
      console.log('Form Data:', formData);
    } else {
     this.pharmacistInformationForm.markAllAsTouched();   
     this.activeindex.emit(1); 
    }
  }

  OnPreviousPage() {
    this.activeindex.emit(0);   
  }
}
