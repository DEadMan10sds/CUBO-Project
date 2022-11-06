import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  }

  ngOnChanges() {
    this.currentClass = this.classesService.getSpecificClassByID(
      this.currentClassID
    );
  }

  ngOnDestroy() {
    console.log('Destroy detail classes');
  }
}
