import { Component, EventEmitter, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ClassesModel } from 'src/app/models/classes.model';
import {Input, Output} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {  Subscription } from 'rxjs';
import { ClassBackConnection } from 'src/app/services/classesBackConnection.service';
import { storeUserData } from 'src/app/services/storeUser.service';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {
  classes: ClassesModel[] = [];
  classesArraySuscription: Subscription;
  labID: string;
  selectedClassID: string;

  @Output() hasErrorEvent = new EventEmitter<boolean>();
  errorData: string = null;

  //@Output() selectedClass: boolean = false;
  @Output() selectedCLassData = new EventEmitter<ClassesModel>();
  @Input()  laboratory: string;

  userRole: string;

  constructor(
    private classService: ClassesService,
    private classBackConnection: ClassBackConnection,
    private currentRoute: ActivatedRoute,
    private userData: storeUserData
  ) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.labID = params['idLab'];
        //console.log("LAB TO SELECT CLASSES", this.labID)
      }
    );
    if(this.labID !== '0') this.onFetchClasses();
    this.classesArraySuscription = this.classService.classesChanges.subscribe(
      (classArray: ClassesModel[]) => {
        this.classes = classArray;
      }
    );
    this.userRole = this.userData.getCurrentUserRole();
    //this.classes = this.classService.getExistingClasses();
    //console.log("LIST", this.classes)
  }

  onFetchClasses()
  {
    this.classBackConnection.fetchClasses(this.labID).subscribe(
      classArray =>
      {
        this.classService.setClasses(classArray)
        this.classes = classArray;
      },
      (error) => {
        console.log(error)
        this.hasErrorEvent.emit(true);
      }
    );
  }

  onSelectedClass(childSelectedClassID: string)
  {

    this.selectedClassID = childSelectedClassID;
    const auxClass = this.classes.find(selectClass => selectClass.id === this.selectedClassID);
    //console.log(this.classes.find(selectClass => selectClass.id === this.selectedClassID))
    this.selectedCLassData.emit(auxClass);
    //console.log("Componente lista: ", auxClass)
  }

  ngOnDestroy()
  {
    this.classesArraySuscription.unsubscribe()
  }

}
