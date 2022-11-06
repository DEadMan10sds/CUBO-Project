import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Laboratories } from 'src/app/interfaces/laboratories.interface';
import { LaboratoriesService } from 'src/app/services/labos.service';
import { BackLaboratories } from 'src/app/services/labosBack.service';

@Component({
  selector: 'app-labos-list',
  templateUrl: './labos-list.component.html',
  styleUrls: ['./labos-list.component.css'],
})
export class LabosListComponent implements OnInit {
  labos: Laboratories[];
  labosChangesSubscription: Subscription;

  constructor(private labsService: LaboratoriesService) {}

  ngOnInit(): void {
    this.labosChangesSubscription =
      this.labsService.laboratoriesChanges.subscribe({
        next(value) {
          this.labos = value;
        },
        error(err) {
          console.log(err);
        },
      });
    this.labos = this.labsService.getLabsArray();
  }

  setIDLab(labID: string) {
    localStorage.setItem('currentLab', labID);
  }

  ngOnDestroy() {
    this.labosChangesSubscription.unsubscribe();
  }
}
