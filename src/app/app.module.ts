// app.module.ts - Root module file for an Angular application
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview'; 
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PharmacyFormComponent } from './pharmacy-form/pharmacy-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  declarations: [AppComponent,PharmacyFormComponent,LoginComponent, DashboardComponent, ErrorComponent,SideMenuComponent],
  imports: [BrowserModule,TabViewModule, CardModule, InputTextModule,InputTextareaModule,CheckboxModule ,ButtonModule,DropdownModule,
    CommonModule,FieldsetModule,FormsModule,RadioButtonModule,ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}