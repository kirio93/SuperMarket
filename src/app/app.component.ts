import {Component} from '@angular/core';
import {LoginService} from './providers/login.service';
import {Router} from '@angular/router';
import {SharedService} from './providers/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logged = false;

  constructor(private loginService: LoginService, private router: Router, private sharedService: SharedService) {
    let userLogged = localStorage.getItem('user');
    if (userLogged != null) {
      this.logged = true;
      let token: string[] = atob(localStorage.getItem('token')).split(':');
      let user = {username: token[0], password: token[1]};
      this.loginService.login(user).subscribe(data => {
        console.log('logged' + data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', btoa(user.username + ':' + user.password));
        this.logged = true;
        this.router.navigate(['list-product']);
      }, (err) => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.logged = true;
        this.router.navigate(['login']);

      });
    }
    sharedService.changeEmitted$.subscribe(text => {
      console.log(text);
      this.logged=true;
    });
  }

  logout() {
    this.loginService.logout().subscribe(data => {
      console.log('logged out.' + data);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    }, (err) => {
      console.log('logger out. ');
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      this.logged = false;
    });
  }

  isLogged(event) {
    console.log(event);
    this.logged = event;
  }
}
