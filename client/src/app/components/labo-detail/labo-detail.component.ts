import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClassInterface } from 'src/app/interfaces/classes.interface';
import { Laboratories } from 'src/app/interfaces/laboratories.interface';
import { ClassesService } from 'src/app/services/classes.service';
import { ClassesBackService } from 'src/app/services/classesBack.service';
import { LaboratoriesService } from 'src/app/services/labos.service';
import { BackLaboratories } from 'src/app/services/labosBack.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-labo-detail',
  templateUrl: './labo-detail.component.html',
  styleUrls: ['./labo-detail.component.css'],
})
export class LaboDetailComponent implements OnInit {
  userRole: string;
  currentLabID: string;
  selectedClass: string;
  classesOfLab: ClassInterface[];
  classesSubscription: Subscription;
  currentLab: Laboratories;

  createClass: boolean = false;
  canEdit: boolean = false;

  @ViewChild('FormData') laboForm: NgForm;
  @ViewChild('DeleteForm') deleteForm: NgForm;
  @ViewChild('ModalDelete') modal: ElementRef;

  constructor(
    private labService: LaboratoriesService,
    private laboratoriesBack: BackLaboratories,
    private activeRoute: ActivatedRoute,
    private classesService: ClassesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.currentLabID = params['labID'];
      localStorage.setItem('currentLab', this.currentLabID);
    });
    this.currentLab = this.labService.getSpecificLabo(this.currentLabID);

    //OBTENER LAS CLASES DEL LABO
    this.classesSubscription = this.classesService.classArrayChanges.subscribe({
      next(value) {
        this.classesOfLab = value;
      },
      error(err) {
        console.log(err);
      },
    });
    this.classesOfLab = this.classesService.getClassesArray();
    this.userRole = this.userService.getUserLogged().role;
  }

  editMode() {
    this.canEdit = !this.canEdit;
  }

  createClassMode(classID) {
    localStorage.setItem('classID', classID);
    this.createClass = !this.createClass;
  }

  setCreateClassMode(newState: boolean) {
    this.createClass = newState;
  }

  editLab() {
    this.editMode();
    this.laboForm.value.id = this.currentLabID;
    this.laboratoriesBack.editLab(this.laboForm.value);
  }

  deleteLab() {
    this.laboratoriesBack.deleteLab(this.currentLabID);
    this.router.navigate(['']);
  }

  selectClass(idOfClass: string) {
    this.selectedClass = idOfClass;
  }

  ngOnDestroy() {
    this.classesService.setEmptyClassesArray();
    this.classesSubscription.unsubscribe();
  }
}
