import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule   }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DropDownDirective } from './directive/dropdown.directive';
// import { FormControlDirective } from './directive/form-control.directive';


import { AgGridModule } from 'ag-grid-angular';
import { NestDirective } from './directive/nest.directive';
import { LatchDirective } from './directive/latch.directive';
import { InputHandleDirective } from './directive/input-handle.directive';
import { DateClickDirective } from './directive/date-click.directive';
import { NativeQueryDirective } from './directive/native-query.directive';
import { AgGridDirective } from './directive/ag-grid.directive';
import { ExtendDirective } from './directive/extend.directive';
import { GoogleMapsDirective } from './directive/google-maps.directive';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DropDownDirective,
    NestDirective,
    LatchDirective,
    InputHandleDirective,
    DateClickDirective,
    NativeQueryDirective,
    AgGridDirective,
    ExtendDirective,
    GoogleMapsDirective,
    // FormControlDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([FormComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }