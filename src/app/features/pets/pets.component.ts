import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pets',
  templateUrl: 'pets.component.html',
  styleUrls: ['pets.component.scss'],
})
export class PetsComponent implements OnInit {
  order!: any;

  constructor() {}

  ngOnInit() {}
}
