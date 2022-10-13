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

  constructor(private labService: LaboratoriesService, private backConnection: BackConnectionService) { }

  ngOnInit(): void {
    this.onFetchLabs();
    this.labsSubscription = this.labService.laboratoriesChanges.subscribe(
      (laboratiories: LaboratoriesModel[]) => {
        this.existingLabs = laboratiories;
      }
    );
  }

  onFetchLabs()
  {
    this.backConnection.fetchLabs().subscribe(
      labs => {
        this.existingLabs = labs;
      }
    );
  }
}
