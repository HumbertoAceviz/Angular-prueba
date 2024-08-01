// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoginComponent } from './core/components/login/login.component';
import { environment } from '../environments/environment';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideAuth, getAuth } from '@angular/fire/auth';

// Módulos
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

// Servicios
import { UserService } from './services/user-service/user.service';
import { RegisterComponent } from './core/components/register/register.component';
import { DirectivesModule } from './modules/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideAuth(() => getAuth()), // Asegúrate de proporcionar el módulo de Auth
    SharedModule,
    DirectivesModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
