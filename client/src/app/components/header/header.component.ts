import { Component, OnInit } from '@angular/core';
import { storeUserData } from 'src/app/services/storeUser.service';
import { UserBackConnectionService } from 'src/app/services/userBackConnection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;

  constructor(
    private userBack: UserBackConnectionService,
    private userData: storeUserData
    ){}

  ngOnInit(): void {
    this.isLogged = this.userBack.isLoggedIn();
    console.log(this.isLogged)
  }

  logOut()
  {
    this.userBack.logOut();
  }
}
