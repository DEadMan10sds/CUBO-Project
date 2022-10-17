import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { ClassesService } from 'src/app/services/classes.service';
import { storeUserData } from 'src/app/services/storeUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ ClassesService]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //console.log(this.actualUserData)
  }

}
