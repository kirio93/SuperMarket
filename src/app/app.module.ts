import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterComponent } from './register/register.component';
import { ListProductComponent } from './list-product/list-product.component';
import {LoginService} from "./Providers/login.service";
import {InterceptorService} from "./Providers/interceptor.service";
import {AuthGuardService} from "./Providers/auth-guard.service";
import {SharedService} from "./Providers/shared.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    AppRoutingModule,
  ],
  providers: [LoginService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true,
    },
    AuthGuardService,
    SharedService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
