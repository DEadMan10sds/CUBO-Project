import { Component, OnInit } from '@angular/core';
import { BackConnectionService } from 'src/app/services/backConnection.service';
import { UserBackConnectionService } from 'src/app/services/userBackConnection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private userBack: UserBackConnectionService){}

  ngOnInit(): void {

  }

  logOut()
  {
    this.userBack.logOut();
  }
}
