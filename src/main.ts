import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ConfigService } from './app/services/config.service';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const loadConfig = (configService: ConfigService) => () => {
  return firstValueFrom(
    configService.loadConfig().pipe(config => {
      configService.setConfig(config);
      return config;
    })
  );
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule ) ,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true,
    },
  ],
}).catch(err => console.error(err));