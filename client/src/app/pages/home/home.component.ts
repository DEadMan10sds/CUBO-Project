import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  route: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngAfterContentChecked() {
    this.route = this.router.url;
  }

  ngOnDestroy() {
    this.route = '';
  }
}
