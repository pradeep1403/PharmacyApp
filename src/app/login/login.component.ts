import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Auth0Service } from '../services/Auth0.service';
import { Router, ActivatedRoute } from '@angular/router';
import {UserProfileService} from './../services/userProfile.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule,PasswordModule,ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth0Service: Auth0Service, private route: ActivatedRoute, private router: Router, private userProfileService: UserProfileService) {
  }
  ngOnInit() {
    // Capture the URL parameters (code, state, etc.)
    let code ="";
    this.route.queryParams.subscribe(params => {
       code = params['code'];
      
      
      // You would typically send the code to your server to exchange for tokens
    });
    if(code){
      this.auth0Service.getTokenData(code).subscribe({
        next: async (response) => {
          debugger;
          const token = response.id_token;
            this.auth0Service.storeToken(token);
            this.auth0Service.storeExpiresIn(240000)//(response.expires_in);
            this.auth0Service.storeRefreshToken(response.refresh_token);
            await this.getUserProfile();
            this.router.navigate(['/dashboard']); // Redirect to dashboard
        },
        error: (error) => {
          console.error('Error:', error)

        },
    });
  }
  
}
redirectToAuth0(){
  window.location.href = this.auth0Service.generateAuth0LoginURL();
}
async getUserProfile(){
    this.userProfileService.getUserProfile().subscribe({
      next: (response) => {
        debugger;
        if(response.email){ 
          if(response.passwordChanges == null || response.passwordChanges == false){
            this.router.navigate(['/change-password']);
          }
          this.auth0Service.storeUserProfile(JSON.stringify(response));
        }
        else{
          this.auth0Service.clearSession();
        }
      },
      error: (error) => {
          console.error('Error:', error)

        }
  })
}
}
