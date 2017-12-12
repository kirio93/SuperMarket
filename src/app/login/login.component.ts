import { Component, OnInit } from '@angular/core';
import {LoginService} from "../Providers/login.service";
import {SharedService} from "../Providers/shared.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user ={username:'', password:'', profileType:'ROLE_ADMIN'};

  constructor(private loginService:LoginService, private location:Location,
              private router:Router, private sharedService:SharedService,) { }

  ngOnInit() {
  }

  login(){
    this.loginService.login(this.user).subscribe( data=> {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', btoa(this.user.username+':'+this.user.password));
      this.sharedService.emitChange('logged=true');
      this.router.navigate(['list-product'], {replaceUrl:true});

    }, err=>{
      console.log(err);
    })
  }


}
