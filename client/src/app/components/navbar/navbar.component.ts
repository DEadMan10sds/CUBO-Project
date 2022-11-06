import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() UserData: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    //console.log('Navbar: ', this.UserData);
  }

  logout() {
    this.userService.logOut();
  }
}
