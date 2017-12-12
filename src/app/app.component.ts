import { Component } from '@angular/core';
import {LoginService} from "./Providers/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logged= false;

constructor (private loginService:LoginService, private router:Router,){
  let userLogger=localStorage.getItem('user');
  if(userLogger!= null)
    this.logged=true;
  let token: string[]= atob(localStorage.getItem('token')).split(':');
  let user= {username:token[0], password:token[1]};
  this.loginService.login(user).subscribe(data=>
  {console.log('logged'+ data);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('token', btoa(user.username+':'+ user.password));
    this.logged= true;
    this.router.navigate(['list-product']);
  }, (err)=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.logged=true;
    this.router.navigate(['login'])
  })
}
  logout(){
    this.loginService.logout().subscribe( data=>{
      console.log('logged out.'+data);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }, (err)=>{
      console.log('logger out. ')
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      this.logged=false
    })
  }




}
