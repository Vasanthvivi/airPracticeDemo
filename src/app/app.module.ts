import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxAirtableModule } from 'ngx-airtable';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxAirtableModule.forRoot({
      apiKey:"key7bpzhhjmpHhaYU",
      endpointUrl:"https://api.airtable.com"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
