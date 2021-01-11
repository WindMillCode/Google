import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule   }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DatasetDirective } from './directive/dataset.directive';
import { RegularTablesDirective } from './directive/regular-tables.directive';
import { DropDownDirective } from './directive/dropdown.directive';
// import { FormControlDirective } from './directive/form-control.directive';


import { AgGridModule } from 'ag-grid-angular';
import { TableSchemasDirective } from './directive/table-schemas.directive';
import { NestDirective } from './directive/nest.directive';
import { LatchDirective } from './directive/latch.directive';
import { InputHandleDirective } from './directive/input-handle.directive';
import { DateClickDirective } from './directive/date-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DatasetDirective,
    RegularTablesDirective,
    DropDownDirective,
    TableSchemasDirective,
    NestDirective,
    LatchDirective,
    InputHandleDirective,
    DateClickDirective,
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
