import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, pipe, tap } from 'rxjs';
import { LaboratoriesService } from 'src/app/services/labos.service';
import { BackLaboratories } from 'src/app/services/labosBack.service';

@Component({
  selector: 'app-edit-labo',
  templateUrl: './edit-labo.component.html',
  styleUrls: ['./edit-labo.component.css'],
})
export class EditLaboComponent implements OnInit {
  @ViewChild('CreateLab') newLabForm: NgForm;

  hadError: boolean = false;
  error: string;

  constructor(
    private router: Router,
    private labBack: BackLaboratories,
    private labsService: LaboratoriesService
  ) {}

  ngOnInit(): void {}

  createLab() {
    this.newLabForm.value.classes = [];
    if (this.newLabForm.value.status !== true)
      this.newLabForm.value.status = false;
    this.labBack
      .createLab(this.newLabForm.value)
      .pipe(
        tap((result) => this.cancelCreate()),
        catchError((err) => this.handelError(err))
      )
      .subscribe();

    this.labBack.fetchLabs().subscribe();
  }

  cancelCreate() {
    this.router.navigate(['']);
  }

  handelError(err) {
    console.log(err);
    this.hadError = true;
    this.error = err.error.Message;
    return of(err);
  }

  ngOnDestroy() {
    this.labsService.deleteAllLabs();
    this.labBack.fetchLabs().subscribe();
  }
}
