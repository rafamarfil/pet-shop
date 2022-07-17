import { Pet } from '../models/pet';

export class CreatePet {
  static readonly type = '[Pet] Create';

  constructor(public payload: Pet) {}
}

export class GetPetsByStatus {
  static readonly type = '[Pet] GetPetsByStatus';

  constructor(public params: string[]) {}
}
