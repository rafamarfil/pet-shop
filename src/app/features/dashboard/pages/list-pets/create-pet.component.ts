import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../../pets/pets.service';

@Component({
  selector: 'create-pet',
  templateUrl: 'create-pet.component.html',
  styleUrls: ['create-pet.component.scss'],
})
export class CreatePetComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getPets('available').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
