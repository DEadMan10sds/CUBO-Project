import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClassesModel } from 'src/app/models/classes.model';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  classID: string;
  actualClass: ClassesModel;


  constructor(private actualClassesService: ClassesService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.classID = params['classID'];
        this.actualClass = this.actualClassesService.getSingleClass(this.classID);
      }
    );
  }

}
