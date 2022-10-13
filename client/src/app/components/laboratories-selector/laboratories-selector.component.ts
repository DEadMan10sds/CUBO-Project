import { Component, OnInit } from '@angular/core';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { LaboratoriesService } from 'src/app/services/laboratories.service';

@Component({
  selector: 'app-laboratories-selector',
  templateUrl: './laboratories-selector.component.html',
  styleUrls: ['./laboratories-selector.component.css']
})
export class LaboratoriesSelectorComponent implements OnInit {
  existingLabs: LaboratoriesModel[];

  constructor(private labService: LaboratoriesService) { }

  ngOnInit(): void {
    this.existingLabs = this.labService.getLaboratories();
  }
}
