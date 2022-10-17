import { Component, OnInit } from '@angular/core';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import {Subscription} from 'rxjs';
import { UserBackConnectionService } from 'src/app/services/userBackConnection.service';
import { storeUserData } from 'src/app/services/storeUser.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-laboratories-selector',
  templateUrl: './laboratories-selector.component.html',
  styleUrls: ['./laboratories-selector.component.css']
})
export class LaboratoriesSelectorComponent implements OnInit {
  existingLabs: LaboratoriesModel[];
  labsSubscription: Subscription;

  userRole: string;

  actualUserData: UserModel;
  userSuscription: Subscription;

  constructor(
      private labService: LaboratoriesService,
      private userDataStored: storeUserData
    ) { }

  ngOnInit(): void {
    this.labsSubscription = this.labService.laboratoriesChanges.subscribe(
      (laboratories: LaboratoriesModel[]) => {
        this.existingLabs = laboratories;
      }
    );
    this.userSuscription = this.userDataStored.userStored.subscribe(
      (resultUserData: UserModel) => {
        this.actualUserData = resultUserData;
      }
    );
    this.actualUserData = this.userDataStored.getUserStored();
    console.log(this.actualUserData)
    this.userRole = this.userDataStored.getCurrentUserRole()
    this.existingLabs = this.labService.getLaboratories();
    //console.log(this.existingLabs)
  }

  ngOnDestroy():void
  {
    this.labsSubscription.unsubscribe();
  }
}
