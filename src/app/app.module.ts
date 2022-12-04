import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { ButtonUiComponent } from '../common/buttonUi/buttonUi.component'
import { InputUiComponent } from '../common/inputUi/inputUi.component'
import { ConfirmModalUiComponent } from '../common/confirmModal/confirmModal.component'
import { HttpClientModule }   from '@angular/common/http';
@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule ],
    declarations: [ AppComponent, ButtonUiComponent, InputUiComponent, ConfirmModalUiComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }