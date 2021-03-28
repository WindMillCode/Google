import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';
import {MyErrorHandler} from './errorHandler'
import { HttpClientModule   }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HammerModule} from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
// import { FormControlDirective } from './directive/form-control.directive';
import {environment as env } from '../environments/environment'

import { AgGridModule } from 'ag-grid-angular';
import { NestDirective } from './directive/nest.directive';
import { LatchDirective } from './directive/latch.directive';

import { DateClickDirective } from './directive/date-click.directive';

import { AgGridDirective } from './directive/ag-grid.directive';
import { ExtendDirective } from './directive/extend.directive';

import { DeltaNodeDirective } from './directive/delta-node.directive';
import { GsapCursorDirective } from './directive/gsap-cursor.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SectionDirective } from './directive/section.directive';
import { NavigationDirective } from './directive/navigation.directive';
import { ListModelsDirective } from './directive/list-models.directive';

let providers = []
if(env.testingAcct.confirm === "true"){

	providers = [{provide: ErrorHandler, useClass: MyErrorHandler}]
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NestDirective,
    LatchDirective,
    DateClickDirective,
    AgGridDirective,
    ExtendDirective,
    DeltaNodeDirective,
    GsapCursorDirective,
    SectionDirective,
    NavigationDirective,
    ListModelsDirective,

  ],
  imports: [
    HammerModule,
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
	MatProgressSpinnerModule,
    AgGridModule.withComponents([FormComponent])
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
