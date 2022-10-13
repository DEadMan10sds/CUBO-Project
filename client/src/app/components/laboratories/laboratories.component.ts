import { Component, Input, OnInit } from '@angular/core';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css']
})
export class LaboratoriesComponent implements OnInit {

  @Input() currentLab: LaboratoriesModel;

  constructor() { }

  ngOnInit(): void {
    //console.log('Hello', this.currentLab)
  }

}
