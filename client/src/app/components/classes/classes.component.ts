import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ClassesModel } from '../../models/classes.model'

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  @Input() incomingClass: ClassesModel;
  @Output() idClassSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    //console.log("Incoming Class",this.incomingClass);
  }

  onClick(){
    this.idClassSelected.emit(this.incomingClass.id);
  }

}
