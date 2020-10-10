import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule   }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { DateClickDirective } from './directive/date-click.directive';
import { DropDownDirective } from './directive/dropdown.directive';
import { ExtendDirective } from './directive/extend.directive';
import { FileHandlerDirective } from './directive/file-handler.directive';
import { FocusFontDirective } from './directive/focus-font.directive';
// import { FormControlDirective } from './directive/form-control.directive';
import { InputHandleDirective } from './directive/input-handle.directive';
import { MoneyClickDirective } from './directive/money-click.directive';
import { SignPadDirective } from './directive/sign-pad.directive';
import { ToggleButtonDirective } from './directive/toggle-button.directive';
import { PrintFilesDirective } from './directive/print-files.directive';
import { PlaygroundDirective } from './directive/playground.directive';
import { SignoutDirective } from './directive/signout.directive';
import { UploadDirective } from './directive/upload.directive';
import { FoldersDirective } from './directive/folders.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DateClickDirective,
    DropDownDirective,
    ExtendDirective,
    FileHandlerDirective,
    FocusFontDirective,
    // FormControlDirective,
    InputHandleDirective,
    MoneyClickDirective,
    SignPadDirective,
    ToggleButtonDirective,
    PrintFilesDirective,
    PlaygroundDirective,
    SignoutDirective,
    UploadDirective,
    FoldersDirective
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
