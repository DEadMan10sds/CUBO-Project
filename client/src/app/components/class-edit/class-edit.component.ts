import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClassesModel } from 'src/app/models/classes.model';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  currentClass: ClassesModel;
  editClass: boolean = false;
  existClassInArray: boolean;
  classID: string;

  constructor(private currentClassService: ClassesService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.classID = params['classID']
        if(this.classID !== '0') this.editClass = true;
        this.existsClass();
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

}
