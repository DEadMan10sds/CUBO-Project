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

@Component({
  selector: 'app-labo-detail',
  templateUrl: './labo-detail.component.html',
  styleUrls: ['./labo-detail.component.css'],
})
export class LaboDetailComponent implements OnInit {
  //userRole: string;
  //currentLab: Laboratories;
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
    private classesBack: ClassesBackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.currentLabID = params['labID'];
      localStorage.setItem('currentLab', this.currentLabID);
    });
    this.currentLab = this.labService.getSpecificLabo(this.currentLabID);
    //console.log(this.currentLab);

    //OBTENER LAS CLASES DEL LABO
    //this.classesBack.fetchClasses(this.currentLabID);
    this.classesSubscription = this.classesService.classArrayChanges.subscribe({
      next(value) {
        this.classesOfLab = value;
      },
      error(err) {
        console.log(err);
      },
    });
    this.classesOfLab = this.classesService.getClassesArray();
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
    console.log(this.laboForm.value);
    this.laboratoriesBack.editLab(this.laboForm.value);
  }

  deleteLab() {
    //this.editMode();
    this.laboratoriesBack.deleteLab(this.currentLabID);
    this.router.navigate(['/labs']);
    console.log(this.deleteForm.value);
  }

  selectClass(idOfClass: string) {
    this.selectedClass = idOfClass;
  }

  ngOnDestroy() {
    //localStorage.removeItem('currentLab');
    this.classesService.setEmptyClassesArray();
    this.classesSubscription.unsubscribe();
  }
}
