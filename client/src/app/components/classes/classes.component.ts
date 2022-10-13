import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassesModel } from '../../models/classes.model'

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  @Input() incomingClass: ClassesModel;

  constructor() { }

  ngOnInit(): void {}

  onClick(){
    console.log(this.incomingClass);
  }

}
