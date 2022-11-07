import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { concat } from 'rxjs';
import { ClassInterface } from 'src/app/interfaces/classes.interface';
import { ClassesService } from 'src/app/services/classes.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css'],
})
export class ClassDetailsComponent implements OnInit {
  //@Input() classToReview: ClassInterface;
  @Input() currentClassID: string;
  currentClass: ClassInterface;
  teacher;
  startDate;
  endDate;

  constructor(
    private classesService: ClassesService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentClass = this.classesService.getSpecificClassByID(
      this.currentClassID
    );
    if (typeof this.currentClass.teacher !== 'string')
      this.teacher = this.currentClass.teacher;

    //------------------------------------Format date
    this.setDates();
  }

  ngOnChanges() {
    this.currentClass = this.classesService.getSpecificClassByID(
      this.currentClassID
    );
  }

  setDates() {
    let dateAux = new Date(this.currentClass.startDate);
    const day = dateAux.getDate();
    const month = dateAux.getMonth();
    const year = dateAux.getFullYear();

    this.startDate = day + '/' + month + '/' + year;

    if (this.currentClass.type === 'CLASS') {
      let dateEndAux = new Date(this.currentClass.endDate);
      const dayEnd = dateEndAux.getDate();
      const monthEnd = dateEndAux.getMonth();
      const yearEnd = dateEndAux.getFullYear();

      this.startDate = dayEnd + '/' + monthEnd + '/' + yearEnd;
    }
  }

  ngOnDestroy() {}
}
