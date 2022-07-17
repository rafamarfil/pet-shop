import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pets',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['pets.component.scss'],
})
export class PetsComponent implements OnInit {
  order!: any;

  constructor() {}

  ngOnInit() {}
}
