import {
  AfterContentInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClassInterface } from 'src/app/interfaces/classes.interface';
import { Laboratories } from 'src/app/interfaces/laboratories.interface';
import { ClassesService } from 'src/app/services/classes.service';
import { ClassesBackService } from 'src/app/services/classesBack.service';
import { LaboratoriesService } from 'src/app/services/labos.service';

@Component({
  selector: 'app-edit-classes',
  templateUrl: './edit-classes.component.html',
  styleUrls: ['./edit-classes.component.css'],
})
export class EditClassesComponent implements OnInit, AfterContentInit {
  labID: string;
  labData: Laboratories;
  labsArray: Laboratories[];
  classID: string;
  currentClass: ClassInterface;
  availableHours: Number[] = [
    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  days: string[] = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT'];
  selectedDays: string[] = [];

  @Output() CreateClass = new EventEmitter<boolean>();
  @ViewChild('NewClassForm', { static: false }) formData: NgForm;

  constructor(
    private activateRoute: ActivatedRoute,
    private labService: LaboratoriesService,
    private classesBack: ClassesBackService,
    private classesService: ClassesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      this.labID = params['labID'];
    });
    this.classID = localStorage.getItem('classID');
    this.labData = this.labService.getSpecificLabo(this.labID);
    this.labsArray = this.labService.getLabsArray();
    this.setAvailableHours();
  }

  ngAfterContentInit() {
    if (this.classID) {
      this.currentClass = this.classesService.getSpecificClassByID(
        this.classID
      );
      if (this.currentClass !== undefined) {
        this.availableHours.push(this.currentClass.hour);
        setTimeout(() => {
          this.formData.setValue({
            name: this.currentClass.name,
            hour: this.currentClass.hour,
            place: this.labData.id,
            status: this.currentClass.status,
            type: this.currentClass.type,
            startDate: this.currentClass.startDate,
          });
        });
        this.days.map((day) => {
          if (this.currentClass.repeats.includes(day)) {
            this.selectedDays.push(day);
            console.log('', this.selectedDays.includes(day));
          }
        });
        console.log(this.selectedDays);
      }
    }
    //console.log(this.formData);
  }

  addDay(newDay: string) {
    this.selectedDays.push(newDay);
  }

  setAvailableHours() {
    this.labData.hours.map((currentHour) => {
      const indexRepeatedHour = this.availableHours.indexOf(currentHour);
      this.availableHours.splice(indexRepeatedHour, 1);
    });
  }

  createClass() {
    const splitedHour = this.formData.value.hour.split(':');
    this.formData.value.hour = +splitedHour[0];
    //this.classesBack.createClassOnLab(this.labID, this.formData.value);

    this.formData.value.repeats = this.selectedDays;

    if (this.currentClass !== undefined)
      this.classesBack.editClass(this.classID, this.formData.value);
    else this.classesBack.createClassOnLab(this.labID, this.formData.value);

    console.log(this.formData.value);
    this.router.navigate(['/labs']);
  }

  cancelCreateClass() {
    this.CreateClass.emit(false);
  }

  deleteClass() {
    console.log(this.currentClass.id, {
      hour: this.currentClass.hour,
    });
    this.classesBack.deleteClass(this.labID, this.currentClass.id, {
      hour: this.currentClass.hour,
    });
    this.router.navigate(['/labs']);
  }
}
