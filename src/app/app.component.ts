import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PharmacyFormComponent } from './pharmacy-form/pharmacy-form.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PharmacyFormComponent,LoginComponent,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pharmacy-app';
}
