import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { PharmacyInformation } from '../models/Pharmacy-details';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PharmacyService {
  constructor(private configService: ConfigService,private http: HttpClient) {}

  getBaseURL(): string {    
    return this.configService.getConfig('apiBaseUrl');
  }

   // Send Pharmacist JSON data to API (POST Request)
   sendPharmacyData(data: PharmacyInformation | null): Observable<any> { 
    return this.http.post<any>(this.getBaseURL() + '/createPharmacy', data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
}

  getpharmacydata(ncpdp: number): Observable<any> {    
    let  params = new HttpParams().set('nationalProviderId', "");
    params = params.set('ncpdp', ncpdp.toString());
    params = params.set('medicareProviderId', "");
    return this.http.get<any>(this.getBaseURL()+'/PharmacyByIdentifiers', { params });
  }

  getconfigurationdata(type: string): Observable<any> {    
    let  params = new HttpParams().set('type', type);    
    return this.http.get<any>(this.getBaseURL()+'/ConfigureNamesByType', { params });
  }
}