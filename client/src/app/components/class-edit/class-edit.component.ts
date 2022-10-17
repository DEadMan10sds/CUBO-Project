import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassesModel } from 'src/app/models/classes.model';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { UserModel } from 'src/app/models/user.model';
import { ClassesService } from 'src/app/services/classes.service';
import { ClassBackConnection } from 'src/app/services/classesBackConnection.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import { storeUserData } from 'src/app/services/storeUser.service';

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
  typeClass: string[] = ['Clase', "Examen"];
  possibleStatus: boolean[] = [true, false]
  repeats: string[] = ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"];
  hoursAvailables: number[] = [];
  occupiedHours: number[];
  startDateString: string;
  auxDate: string = '02/10/2022';
  defaultType: string;

  actualUser: UserModel;
  actualUserSuscription: Subscription;

  constructor(
    private currentClassService: ClassesService,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private labsService: LaboratoriesService,
    private backConnection: ClassBackConnection,
    private userData: storeUserData
    ) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.classID = params['classID'];
        this.labID = params["idLab"];
        //console.log(this.classID)
        this.existsClass();
        this.setHoursAvailable(this.labID);
        if(this.classID !== '0') this.editClass = true;
        if(this.classID === '0') this.existClassInArray = true;
        if(this.existClassInArray) this.currentClass = this.setClass();
        if(this.editClass)
        {
          //console.log(this.currentClass.startDate.toString())
          this.startDateString = this.convertDate(this.currentClass.startDate.toString());
          if(this.currentClass.type === 'CLASS') this.defaultType = 'Clase'
          else this.defaultType = 'Examen'
          this.pushEditinHour()
        }
        //console.log(this.currentClass, this.classID);
      }
    );
    this.actualUserSuscription = this.userData.userStored.subscribe(
      {
        next: (result) => this.actualUser = result
      }
    );
    this.actualUser = this.userData.getUserStored();
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
    {
      return this.currentClass = new ClassesModel(
        {
          id: null,
          name: null,
          date: new Date(),
          place: this.labID,
          status: false,
          free: false,
          teacher: {
            _id: localStorage.getItem('uid'),
            name: ''
          },
          type: null,
          authorized: false,
          recurrent: false,
          repeats: [],
          hour: null,
          startDate: null,
          endDate: null
        }
      );
    }
    else return this.currentClassService.getSingleClass(this.classID);
  }

  convertDate(dateToConver: string):string
  {
    let convertedDate: string[];
    let finalDate: string;
    convertedDate = dateToConver.split('-');
    //console.log(convertedDate)
    finalDate = [convertedDate[0], convertedDate[1],[convertedDate[2][0],convertedDate[2][1] ].join(''),].join('-')
    //console.log(finalDate);
    return finalDate
  }

  submitForm(classForm: NgForm)
  {
    if(classForm.value.type === 'Examen') classForm.value.type = "EXAM";
    else classForm.value.type = "CLASS"
    if(this.editClass) classForm.value.id = this.classID;
    classForm.value.status = this.currentClass.status;
    //classForm.value.authorized = this.currentClass.authorized;
    classForm.value.repeats = this.currentClass.repeats;
    classForm.value.teacher = this.currentClass.teacher;
    const {id, ...newClassData} = classForm.value;
    if(!this.editClass) this.backConnection.createNewClass(newClassData);
    if((classForm.value.place !== this.labID) && this.editClass) this.backConnection.changeLabOfClass(classForm.value, this.labID, this.currentClass.hour)
    if((classForm.value.place === this.labID) && this.editClass) this.backConnection.updateClass(classForm.value, this.currentClass.hour);
    this.backConnection.fetchClasses(this.labID);
    //console.log(newClassData)
    this.popEditingHour();
    this.redirect();
  }

  clearForm()
  {
    this.slForm.reset();
  }

  redirect()
  {
    this.router.navigate(['/', this.labID]);
  }

  changeFree()
  {
    this.currentClass.free = !this.currentClass.free
  }

  changeAuthorization()
  {
    this.currentClass.authorized = !this.currentClass.authorized
    console.log(this.currentClass.authorized);
  }

  changeStatus()
  {
    this.currentClass.status = !this.currentClass.status
  }

  addDay(dayToAdd: string)
  {
    const existsDay = this.currentClass.repeats.indexOf(dayToAdd);
    //console.log(existsDay);
    if(existsDay === -1)return this.currentClass.repeats.push(dayToAdd);
    return this.currentClass.repeats.splice(existsDay, 1);
  }

  setHoursAvailable(selectedLabID: string)
  {
    const fullHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const occupiedHours = this.labsService.getLabHours(selectedLabID);
    this.hoursAvailables = fullHours.filter(function(element) {
      return occupiedHours.indexOf(element) === -1;
    });
  }

  deleteClass()
  {
    this.backConnection.deleteClass(this.classID, this.labID, this.currentClass.hour);
    //console.log("Delete Class", this.classID, this.currentClass.hour);
    this.redirect();
  }

  pushEditinHour()
  {
    this.hoursAvailables.push(this.currentClass.hour);
  }

  popEditingHour()
  {
    const currentHourIndex = this.hoursAvailables.indexOf(this.currentClass.hour);
    this.hoursAvailables.splice(currentHourIndex, 1);
  }

}
