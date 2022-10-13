import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ClassesModel } from 'src/app/models/classes.model';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {

  currentClass: ClassesModel;
  newClass: boolean = false;

  constructor(private currentClassService: ClassesService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        if(params['classID'] === '0')
        {
          this.newClass = true;
          this.currentClass = new ClassesModel('', '', new Date(), '', '', '', false);
        }
        else this.currentClass = this.currentClassService.getSingleClass(params['classID']);
      }
    );
  }

}
