import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MonthsComponent } from './months/months.component';
import { MonthComponent } from './month/month.component';
import { TableComponent } from './table/table.component';
import { NumberToMonthPipe } from './Pipes/number-to-month.pipe';
import { MonthToNumberPipe } from './Pipes/month-to-number.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    MonthsComponent,
    MonthComponent,
    TableComponent,
    NumberToMonthPipe,
    MonthToNumberPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
