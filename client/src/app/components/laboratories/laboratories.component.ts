import { Component, Input, OnInit } from '@angular/core';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { storeUserData } from 'src/app/services/storeUser.service';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css']
})
export class LaboratoriesComponent implements OnInit {

  @Input() currentLab: LaboratoriesModel;
  userRole: string;


  constructor(private userData: storeUserData) { }

  ngOnInit(): void {
    //console.log('Hello', this.currentLab)
    this.userRole = this.userData.getCurrentUserRole()
  }

}
