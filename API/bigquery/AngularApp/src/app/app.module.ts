import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule   }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { CreateDirective } from './directive/create.directive';
// import { FormControlDirective } from './directive/form-control.directive';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CreateDirective,
    // FormControlDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
