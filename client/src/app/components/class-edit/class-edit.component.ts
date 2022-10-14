import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassesModel } from 'src/app/models/classes.model';
import { ClassesService } from 'src/app/services/classes.service';

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

  constructor(private currentClassService: ClassesService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.classID = params['classID'];
        this.labID = params["idLab"];
        this.existsClass();
        if(this.classID !== '0') this.editClass = true;
        if(this.classID === '0') this.existClassInArray = true;
        if(this.existClassInArray) this.currentClass = this.setClass();
        //console.log(this.currentClass, this.classID);
      }
    );
  }

  existsClass()
  {
    this.existClassInArray = this.currentClassService.existsClass(this.classID);
    //console.log(this.existClassInArray)
  }

  setClass():ClassesModel
  {
    if(!this.editClass) return this.currentClass = new ClassesModel(null, null, new Date(), null, null, null, false);
    else return this.currentClassService.getSingleClass(this.classID);
  }

  submitForm(classForm: NgForm)
  {
    classForm.value.id = this.labID;
    console.log("Clase agregada", classForm.value);
  }

}
