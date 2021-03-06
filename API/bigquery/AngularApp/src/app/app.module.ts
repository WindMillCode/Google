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
import { LoadingDirective } from './directive/loading.directive';
import { NativeQueryDirective } from './directive/native-query.directive';
import { AgGridDirective } from './directive/ag-grid.directive';
import { ExtendDirective } from './directive/extend.directive';
import { ExternalQueryDirective } from './directive/external-query.directive';
import { PartitionedTableDirective } from './directive/partitioned-table.directive';
import { ClusteredTableDirective } from './directive/clustered-table.directive';
import { ViewDirective } from './directive/view.directive';
import { GISDirective } from './directive/gis.directive';

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
    LoadingDirective,
    NativeQueryDirective,
    AgGridDirective,
    ExtendDirective,
    ExternalQueryDirective,
    PartitionedTableDirective,
    ClusteredTableDirective,
    ViewDirective,
    GISDirective,
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
