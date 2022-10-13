import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClassesModel } from 'src/app/models/classes.model';
import { ClassesService } from 'src/app/services/classes.service';
import { LaboratoriesService } from 'src/app/services/laboratories.service';

@Component({
  selector: 'app-class-selector-detail',
  templateUrl: './class-selector-detail.component.html',
  styleUrls: ['./class-selector-detail.component.css'],
  providers: [ClassesService]
})
export class ClassSelectorDetailComponent implements OnInit {

  place: string;

  constructor(
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.place = params['labName']
      }
    );
  }

}
