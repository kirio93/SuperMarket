import { Component, OnInit } from '@angular/core';
import {LoginService} from '../providers/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user = {username:'', password:'', profileType:'ROLE_ADMIN', tel: '',
    via: '', cap: '', citta: '', prov: ''};

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
  }

  register() {
    this.loginService.register(this.user).subscribe(data =>{
      console.log(data);
      this.router.navigate(['login']);
    }, err=> {
      console.log(err);
    })
  }

}
