import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { storeUserData } from 'src/app/services/storeUser.service';
import { UserBackConnectionService } from 'src/app/services/userBackConnection.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

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
  }

}
