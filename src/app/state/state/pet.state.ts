import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Pet } from '../models/pet';
import { CreatePet, GetPetsByStatus } from '../actions/pet.action';
import { PetsService } from '@features/pets/services/pets.service';
import { tap } from 'rxjs/operators';

export class PetStateModel {
  pets!: Pet[];
}

@State<PetStateModel>({
  name: 'pets',
  defaults: {
    pets: [],
  },
})
@Injectable()
export class PetState {
  constructor(private petsService: PetsService) {}

  @Selector()
  static getPetList(state: PetStateModel) {
    return state.pets;
  }

  @Action(GetPetsByStatus)
  GetPetsByStatus(
    { getState, setState }: StateContext<PetStateModel>,
    { params }: GetPetsByStatus
  ) {
    return this.petsService.getPetsByStatus(params).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          pets: result,
        });
      })
    );
  }

  @Action(CreatePet)
  createPet(
    { getState, patchState }: StateContext<PetStateModel>,
    { payload }: CreatePet
  ) {
    return this.petsService.createPet(payload).pipe(
      tap((result) => {
        const state = getState();
        patchState({
          pets: [...state.pets, result],
        });
      })
    );
  }
}
