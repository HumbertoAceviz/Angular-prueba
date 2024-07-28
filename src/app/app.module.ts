import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

//import { HighlightDirective } from './directives/highlight.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { UserService } from './services/user.service';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

    //HighlightDirective,
    FilterPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HomeModule],
  providers: [UserService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
