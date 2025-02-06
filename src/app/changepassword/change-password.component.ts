import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Auth0Service } from '../services/Auth0.service';
import { Router, ActivatedRoute } from '@angular/router';
import {UserProfileService} from './../services/userProfile.service';
import { UserProfile } from '../models/Auth0-details';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [InputTextModule,PasswordModule,ButtonModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordResponse:string="";
  isDisabled:boolean = false;
  constructor(private auth0Service: Auth0Service, private route: ActivatedRoute, private router: Router, private userProfileService: UserProfileService) {
  }
  ngOnInit() {
    // Capture the URL parameters (code, state, etc.)
    // let code ="";
    // this.route.queryParams.subscribe(params => {
    //    code = params['code'];
      
      
    //   // You would typically send the code to your server to exchange for tokens
    // });
    // if(code){
    //   this.auth0Service.getTokenData(code).subscribe({
    //     next: (response) => {
    //       debugger;
    //       const token = response.id_token;
    //         this.auth0Service.storeToken(token);
    //         this.auth0Service.storeExpiresIn(240000)//(response.expires_in);
    //         this.auth0Service.storeRefreshToken(response.refresh_token);
    //         this.getUserProfile();
    //         this.router.navigate(['/dashboard']); // Redirect to dashboard
    //     },
    //     error: (error) => {
    //       console.error('Error:', error)

    //     },
    // });
  //}
  
}
changePassword(){
  let userProfile  = this.auth0Service.getUserProfileFromStorage();
  let email = userProfile ? JSON.parse(userProfile).email:"";
  if(email==""){
    this.changePasswordResponse = "Your Profile is Empty";
  }
  this.auth0Service.changePassword( userProfile ? JSON.parse(userProfile).email:"").subscribe({
    next: (response) => {
      debugger;
      if(response){ 
        this.changePasswordResponse = response.message;
        this.auth0Service.clearSession();
        this.isDisabled = true;
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
getUserProfile(){
    this.userProfileService.getUserProfile().subscribe({
      next: (response) => {
        if(response.email){ 
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
