import { Component, OnInit } from '@angular/core';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { BackConnectionService } from 'src/app/services/backConnection.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-laboratories-selector',
  templateUrl: './laboratories-selector.component.html',
  styleUrls: ['./laboratories-selector.component.css']
})
export class LaboratoriesSelectorComponent implements OnInit {
  existingLabs: LaboratoriesModel[];
  labsSubscription: Subscription;

  constructor(private labService: LaboratoriesService) { }

  ngOnInit(): void {
    //this.onFetchLabs();
    //this.backConnection.fetchLabs();
    this.labsSubscription = this.labService.laboratoriesChanges.subscribe(
      (laboratories: LaboratoriesModel[]) => {
        this.existingLabs = laboratories;
      }
    );
    this.existingLabs = this.labService.getLaboratories();
  }

  onFetchLabs(){}

  ngOnDestroy():void
  {
    this.labsSubscription.unsubscribe();
  }
}
