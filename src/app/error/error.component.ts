import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  errorMessage = '401 Unauthorized - Please login to continue';
  redirectToLogIn(){
    window.location.href = "/login";
  }
}
