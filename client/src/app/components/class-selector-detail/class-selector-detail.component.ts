import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClassesModel } from 'src/app/models/classes.model';
import { BackConnectionService } from 'src/app/services/backConnection.service';
import { ClassesService } from 'src/app/services/classes.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';

@Component({
  selector: 'app-class-selector-detail',
  templateUrl: './class-selector-detail.component.html',
  styleUrls: ['./class-selector-detail.component.css'],
  providers: [ClassesService]
})
export class ClassSelectorDetailComponent implements OnInit {

  place: string;
  selectedClass: boolean = false;
  classSelectedData: ClassesModel;
  hasError: boolean = false;

  constructor(
    private currentRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.place = params['idLab']
      }
    );
  }

  setSelectedClass(classDetails: ClassesModel)
  {
    this.selectedClass = true;
    this.classSelectedData = classDetails;
    //console.log("Selector recibiendo clase")
    //console.log(classDetails);
  }

  receiveError(recivingError: boolean)
  {
    this.hasError = recivingError;
  }
}
