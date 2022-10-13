import { Component, OnInit } from '@angular/core';
import { BackConnectionService } from 'src/app/services/backConnection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
  }
}
