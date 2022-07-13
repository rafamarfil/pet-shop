import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'pets',
  templateUrl: 'pets.component.html',
  styleUrls: ['pets.component.scss'],
})
export class PetsComponent implements OnInit {
  order!: any;

  constructor(private router: Router) {}

  ngOnInit() {
    // this.order = this.router.getCurrentNavigation()?.extras.state;
  }
}
