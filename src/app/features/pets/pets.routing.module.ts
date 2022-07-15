import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guards';
import { PetsComponent } from './pets.component';
import { CreatePetComponent } from './pages/create-pet/create-pet.component';
import {
  ListPetsComponent,
  PetDetailsDialogComponent,
} from './pages/list-pets/list-pets.component';

export const PetsRoutes: Routes = [
  {
    path: '',
    component: PetsComponent,
    children: [
      {
        path: 'create-pet',
        component: CreatePetComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list-pets',
        component: ListPetsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PetsRoutes)],
  exports: [RouterModule],
})
export class PetsRoutingModule {
  static components = [
    PetsComponent,
    CreatePetComponent,
    ListPetsComponent,
    PetDetailsDialogComponent,
  ];
}
