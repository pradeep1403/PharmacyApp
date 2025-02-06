import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  // Load config.json at runtime
  loadConfig(): Observable<any> {
    return this.http.get('/assets/config.json').pipe(
      tap((config) => this.setConfig(config))
    );
  }

  // Set config after loading
  setConfig(config: any): void {
    this.config = config;
  }

  // Get specific key from the config
  getConfig(key: string): any {
    return this.config ? this.config[key] : null;
  }
}