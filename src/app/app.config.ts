import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Configuración de rutas
    provideClientHydration(), // Soporte para Hydration si usas SSR
    importProvidersFrom(BrowserModule), // Importar BrowserModule
    importProvidersFrom(BrowserAnimationsModule), // Importar BrowserAnimationsModule
    provideHttpClient(withFetch()), // Configurar HttpClient con fetch
    provideZoneChangeDetection({ eventCoalescing: true }) // Optimización del cambio de zonas
  ]
};
