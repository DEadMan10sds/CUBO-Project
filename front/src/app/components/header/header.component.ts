import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { storeUserData } from 'src/app/services/storeUser.service';
import { UserBackConnectionService } from 'src/app/services/userBackConnection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false;
  loggedSuscription: Subscription;

  constructor(
    private userBack: UserBackConnectionService,
    private userData: storeUserData
    ){}

  ngOnInit(): void {
    this.loggedSuscription = this.userData.userLogged.subscribe(
      {
        next: (resultLogged) => this.isLogged = resultLogged
      }
    );
    //console.log(this.isLogged)
  }

  logOut()
  {
    this.userBack.logOut();
    this.userData.unsetUserLogged();
  }
}
