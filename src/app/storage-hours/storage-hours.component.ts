import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-storage-hours',
  standalone: true,
  imports: [InputTextareaModule, CheckboxModule, ButtonModule, CalendarModule, CommonModule, ReactiveFormsModule,AutoCompleteModule,ToastModule],
  templateUrl: './storage-hours.component.html',
  styleUrl: './storage-hours.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})

export class StorageHoursComponent {
  storeHoursForm!: FormGroup;
  items: string[] = [];
  filteredItems: string[] = [];
  @Output() storehoursgroup = new EventEmitter<any>();
  @Output() activeindex = new EventEmitter<number>();
  days: any[] = [
    { name: 'Monday', key: 'M' },
    { name: 'Tuesday', key: 'Tu' },
    { name: 'Wednesday', key: 'W' },
    { name: 'Thursday', key: 'Th' },
    { name: 'Friday', key: 'F' },
    { name: 'Saturday', key: 'Sa' },
    { name: 'Sunday', key: 'Su' }
  ];

  holidays: any[] = [
    { name: 'Select All', key: 'All' },
    { name: 'Memorial Day', key: 'M' },
    { name: '4th of July', key: 'J' },
    { name: 'Labor Day', key: 'L' },
    { name: 'Thanksgiving', key: 'Th' },
    { name: 'Day After Thanksgiving', key: 'Ath' },
    { name: 'Christmas Eve', key: 'CE' },
    { name: 'Christmas Day', key: 'CD' },
    { name: 'New Years Eve', key: 'NE' },
    { name: 'New Years Day', key: 'ND' }
  ];

  constructor(private fb: FormBuilder,private messageService:MessageService) { }

  ngOnInit() {
    this.storeHoursForm = this.fb.group({
      days: this.fb.array([]),
      holidays: this.fb.array([]),
      alternateHours: [''],
      additionalHolidays: ['']
    });
    this.addDays();
    this.addHolidays();
  }

  get daysArray(): FormArray {
    return this.storeHoursForm.get('days') as FormArray;
  }

  get holidaysArray(): FormArray {
    return this.storeHoursForm.get('holidays') as FormArray;
  }

  addDays() {
    this.days.forEach(day => {
      this.daysArray.push(this.fb.group({
        name: [day.name],
        open: [false],
        openTime: [null],
        closeTime: [null]
      }));
    });
  }

  addHolidays() {
    this.holidays.forEach(holiday => {
      this.holidaysArray.push(this.fb.group({
        name: [holiday.name],
        selected: [false]
      }));
    });
  }

  onNextClick() {
      this.storehoursgroup.emit(this.storeHoursForm);
      this.activeindex.emit(3)
  }

  onDaysSelectAll(event: any) {
    this.daysArray.controls.forEach(control => {
      control.get('open')?.setValue(event.checked);
      if (event.checked) {
        control.get('openTime')?.setValue('9:00 AM');
        control.get('closeTime')?.setValue('5:00 PM');
      } else {
        control.get('openTime')?.setValue(null);
        control.get('closeTime')?.setValue(null);
      }
    });
  }

  onItemChange(event: any, index: number) {
    if (index == 0) {
      this.holidaysArray.controls.forEach(control => {
        control.get('selected')?.setValue(event.checked);
      });
    }
  }

  onDayChange(event: any, index: number) {
    if (event.checked) {
      this.daysArray.controls[index].get('openTime')?.setValue('9:00 AM');
      this.daysArray.controls[index].get('closeTime')?.setValue('5:00 PM');
    } else {
      this.daysArray.controls[index].get('openTime')?.setValue(null);
      this.daysArray.controls[index].get('closeTime')?.setValue(null);
    }
  }

  OnPreviousPage() {    
    this.activeindex.emit(1);
  }
}
