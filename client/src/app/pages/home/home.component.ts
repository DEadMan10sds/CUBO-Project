import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

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
