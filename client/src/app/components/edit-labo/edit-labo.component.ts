import { Component, OnInit } from '@angular/core';
import { FormGroup, Form, FormArray, FormControl, Validators  } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
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
  possibleStatus: boolean[] = [true, false]

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
        if(this.labID !== '0') this.editMode = true;
        this.lab = this.setLab();
        this.initForm();
        console.log(this.lab);
      }
      );
    this.labForm.statusChanges.subscribe(
      (value) => {
        console.log(value);
      }
    )
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
    if(!this.editMode) return new LaboratoriesModel(null, false, null);
    return this.labService.getSingleLab(this.labID);
  }

  submitForm()
  {
    console.log("Front", this.labForm.value);
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
    this.router.navigate(['../'])
  }

}
