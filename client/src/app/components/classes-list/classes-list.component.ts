import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ClassesModel } from 'src/app/models/classes.model';
import {Input} from '@angular/core';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BackConnectionService } from 'src/app/services/backConnection.service';
import { first, Subscription } from 'rxjs';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {
  classes: ClassesModel[] = [];
  classesArraySuscription: Subscription;
  labID: string;

  @Input()  laboratory: string;
  constructor(
    private classService: ClassesService,
    private backConnection: BackConnectionService,
    private currentRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.labID = params['labName'];
        console.log("LAB TO SELECT CLASSES", this.labID)
      }
    );
    this.onFetchClasses();
    this.classesArraySuscription = this.classService.classesChanges.subscribe(
      (classArray: ClassesModel[]) => {
        this.classes = classArray;
      }
    );
    //this.classes = this.classService.getExistingClasses();
    console.log("LIST", this.classes)
  }

  onFetchClasses()
  {
    this.backConnection.fetchClasses(this.labID).subscribe(
      classArray =>
      {
        this.classes = classArray;
      }
    );
  }

}
