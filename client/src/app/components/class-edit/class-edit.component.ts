import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassesModel } from 'src/app/models/classes.model';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { ClassesService } from 'src/app/services/classes.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  @ViewChild('editClassForm', {static: false}) slForm: NgForm;
  subscription: Subscription;
  currentClass: ClassesModel;
  editClass: boolean = false;
  existClassInArray: boolean;
  classID: string;
  labID: string;
  labs: LaboratoriesModel[] = [];

  constructor(
    private currentClassService: ClassesService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private labsService: LaboratoriesService
    ) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.classID = params['classID'];
        this.labID = params["idLab"];
        this.existsClass();
        if(this.classID !== '0') this.editClass = true;
        if(this.classID === '0') this.existClassInArray = true;
        if(this.existClassInArray) this.currentClass = this.setClass();
        console.log(this.currentClass, this.classID);
      }
    );
    this.labs = this.labsService.getLaboratories();
  }

  existsClass()
  {
    this.existClassInArray = this.currentClassService.existsClass(this.classID);
    //console.log(this.existClassInArray)
  }

  setClass():ClassesModel
  {
    if(!this.editClass)
    return this.currentClass = new ClassesModel(
      {
        id: null,
        name: null,
        date: new Date(),
        place: this.labID,
        status: false,
        free: false,
        teacher: null,
        type: null,
        authorized: false,
        recurrent: false,
        repeats: [],
        hour: null,
        startDate: null,
        endDate: null
      }
    );
    else return this.currentClassService.getSingleClass(this.classID);
  }

  submitForm(classForm: NgForm)
  {
    if(this.editClass) classForm.value.id = this.classID;
    console.log("Clase agregada", classForm.value);
  }

  clearForm()
  {
    this.slForm.reset();
  }

  redirect()
  {
    this.router.navigate(['/', this.labID]);
  }

}
