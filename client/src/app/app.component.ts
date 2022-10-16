import { Component, OnInit } from '@angular/core';
import { UserBackConnectionService } from './services/userBackConnection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLogged: boolean = false;

  constructor(private userBack: UserBackConnectionService){}

  ngOnInit(): void {
    this.isLogged = this.userBack.isLoggedIn()
  }

}
