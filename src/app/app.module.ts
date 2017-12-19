///<reference path="../../node_modules/@angular/material/grid-list/typings/grid-tile.d.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule,
  MatGridListModule, MatExpansionModule, MatCardModule, MatListModule, MatStepperModule, MatIconModule, MatRadioModule
} from '@angular/material';
import {AppRoutingModule} from './/app-routing.module';
import {RegisterComponent} from './register/register.component';
import { ListProductComponent} from './list-product/list-product.component';
import {LoginService} from './providers/login.service';
import {InterceptorService} from './providers/interceptor.service';
import {AuthGuardService} from './providers/auth-guard.service';
import {SharedService} from './providers/shared.service';
import {ListProductService} from './providers/list-product.service';
import {CarrelloComponent} from './carrello/carrello.component';
import {CartaCreditoService} from './providers/carta-credito.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListProductComponent,
    CarrelloComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatExpansionModule,
    AppRoutingModule,
    MatListModule,
    MatStepperModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
    

  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    AuthGuardService,
    SharedService,
    ListProductService,
    CartaCreditoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

