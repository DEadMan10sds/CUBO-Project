import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { storeUserData } from 'src/app/services/storeUser.service';
import { ClassesModel } from '../../models/classes.model'

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  @Input() incomingClass: ClassesModel;
  @Output() idClassSelected = new EventEmitter<string>();

  userRole: string;
  teacherData;
  localStorageID;
  selected: boolean = true;
  activeClass: boolean = false;

  constructor(private userData: storeUserData) { }

  ngOnInit(): void {
    //console.log("Incoming Class",this.incomingClass);
    this.userRole = this.userData.getCurrentUserRole();
    this.localStorageID = localStorage.getItem('uid');
    console.log(this.incomingClass)
  }

  onClick(){
    this.idClassSelected.emit(this.incomingClass.id);
    this.teacherData = this.incomingClass.teacher;
    this.activeClass = true;
    //console.log(this.teacherData.name)
  }

}
