import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ListProductComponent} from "./list-product/list-product.component";
import {AuthGuardService} from "./providers/auth-guard.service";
import {CarrelloComponent} from './carrello/carrello.component';
import {StoricoComponent} from './storico/storico.component';


const routes :Routes =[
  {path: '', redirectTo:'/list-product', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'list-product', component:ListProductComponent, canActivate: [AuthGuardService]},
  {path: 'carrello', component:CarrelloComponent},
  {path: 'storico', component: StoricoComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})


export class AppRoutingModule { }
