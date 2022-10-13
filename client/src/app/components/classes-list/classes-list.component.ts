import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ClassesModel } from 'src/app/models/classes.model';
import { LaboratoriesService } from 'src/app/services/laboratories.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {
  classes: ClassesModel[];

  constructor(
    private actualClasses: ClassesService,
    ) { }

  ngOnInit(): void {
    this.classes = this.actualClasses.getExistingClasses();
  }
}
