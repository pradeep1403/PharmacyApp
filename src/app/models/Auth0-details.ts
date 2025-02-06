export interface Auth0Token {
  access_token: string;
  refresh_token: string;
  id_token:string;
  expires_in: number;
  token_type: string;
  }
  export interface UserProfile{
    PharmacyInfoId:Number;
    firstName:string;
    lastName:string;
    initial:string;
    email:string;
    phoneNumber:string;
    role:string;
    legalName:string

  }