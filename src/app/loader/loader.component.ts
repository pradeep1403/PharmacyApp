import { Component } from '@angular/core';
import { LoaderService } from '../services/loaderService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading | async" class="loader-overlay">
       
      <div class="loader"></div> 
       Loading...     
    </div>
    
  `,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  isLoading = this.loaderService.isLoading$;

  constructor(private loaderService: LoaderService) {}
}