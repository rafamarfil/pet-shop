import { Component, OnInit } from '@angular/core';

import { PetsService } from '@features/pets/pets.service';
@Component({
  selector: 'list-pets',
  templateUrl: 'list-pets.component.html',
  styleUrls: ['list-pets.component.scss'],
})
export class ListPetsComponent implements OnInit {
  constructor(private petsService: PetsService) {}

  ngOnInit() {
    this.petsService.getPetsByStatus('pending').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
