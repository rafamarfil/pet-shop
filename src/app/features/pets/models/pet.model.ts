export interface Pet {
  id: number;
  category: PetCategory;
  name: string;
  photoUrls: string[];
  tags: PetTags[];
  status: string;
}

export interface PetCategory {
  id: number;
  name: string;
}

export interface PetTags {
  id: number;
  name: string;
}
