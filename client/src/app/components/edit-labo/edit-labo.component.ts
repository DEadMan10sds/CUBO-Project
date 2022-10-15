import { Component, OnInit } from '@angular/core';
import { FormGroup, Form, FormArray, FormControl, Validators  } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LaboratoriesModel } from 'src/app/models/laboratories.model';
import { BackConnectionService } from 'src/app/services/backConnection.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';

@Component({
  selector: 'app-edit-labo',
  templateUrl: './edit-labo.component.html',
  styleUrls: ['./edit-labo.component.css']
})
export class EditLaboComponent implements OnInit {

  labID: string;
  editMode: boolean = false;
  lab: LaboratoriesModel;
  labForm: FormGroup;
  labSubscription: Subscription;
  existsLabInArray: boolean;

  constructor(
    private currentRoute: ActivatedRoute,
    private labService: LaboratoriesService,
    private router: Router,
    private backConnection: BackConnectionService
  ) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.labID = params['idLab'];
        if(this.labID !== '0')
        {
          this.editMode = true;
          this.existsLabInArray = this.existsLab();
        }
        if(this.labID === '0')  this.existsLabInArray = true;
        if(this.existsLabInArray)
        {
          this.lab = this.setLab();
          this.initForm();
        }
        //console.log(this.lab);
      }
    );
  }

  private initForm()
  {
    this.labForm = new FormGroup(
      {
        'name': new FormControl(this.lab.name, Validators.required),
        'status': new FormControl(this.lab.status, Validators.required)
      }
    );
  }

  setLab():LaboratoriesModel
  {
    if(!this.editMode) return new LaboratoriesModel(null, false, [], null);
    return this.labService.getSingleLab(this.labID);
  }

  existsLab(): boolean
  {
    if(this.labService.getSingleLab(this.labID)) return true;
    return false;
  }

  changeStatus()
  {
    this.lab.status = !this.lab.status;
    this.labForm.value.status = this.lab.status;
  }

  submitForm()
  {
    //console.log("Front", this.labForm.value);
    if(!this.editMode) this.backConnection.postLab(this.labForm.value);
    else this.backConnection.updateLab(this.labID, this.labForm.value);
    this.cancelForm();
  }

  resetForm()
  {
    this.labForm.reset();
  }

  cancelForm()
  {
    this.router.navigate(['../']);
  }

  deleteLab()
  {
    if(!this.editMode) return;
    this.backConnection.deleteLab(this.labID);
    this.cancelForm();
  }

}
