import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-edit-labo',
  templateUrl: './edit-labo.component.html',
  styleUrls: ['./edit-labo.component.css'],
})
export class EditLaboComponent implements OnInit {
  @ViewChild('CreateLab') newLabForm: NgForm;

  constructor(private router: Router, private labBack: BackLaboratories) {}

  ngOnInit(): void {}

  createLab() {
    this.newLabForm.value.classes = [];
    if (this.newLabForm.value.status !== true)
      this.newLabForm.value.status = false;
    console.log(this.newLabForm.value);
    this.labBack.createLab(this.newLabForm.value);
    this.labBack.fetchLabs();
    this.cancelCreate();
  }

  cancelCreate() {
    this.router.navigate(['/labs']);
  }

  ngOnDestroy() {}
}
