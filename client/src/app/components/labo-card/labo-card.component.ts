import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-labo-card',
  templateUrl: './labo-card.component.html',
  styleUrls: ['./labo-card.component.css'],
})
export class LaboCardComponent implements OnInit {
  @Input() LabData;

  constructor() {}

  ngOnInit(): void {}
}
