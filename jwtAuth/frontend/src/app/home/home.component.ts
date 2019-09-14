import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public user: any;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.user = {
      username : '',
      password : ''
    };
  }

  login() {
    this.userService.login({ 'username': this.user.username, 'password': this.user.password });
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  logout() {
    this.userService.logout();
  }

}
