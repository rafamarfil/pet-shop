import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { generateId } from '@core/utils/utils';

import { PetsService } from '@features/pets/pets.service';
import { Pet, PetTags } from '@features/pets/models/pet.model';

interface Tag {
  name: string;
}
interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'create-pet',
  templateUrl: 'create-pet.component.html',
  styleUrls: ['create-pet.component.scss'],
})
export class CreatePetComponent implements OnInit {
  createPetForm!: FormGroup;
  loader = false;
  destroy$ = new Subject<void>();
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  petTags: Tag[] = [];
  selectedValue!: string;

  statusValues: Status[] = [
    { value: 'available', viewValue: 'Available' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'sold', viewValue: 'Sold' },
  ];

  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private petsService: PetsService
  ) {}

  ngOnInit() {
    this.initCreatePetForm();
  }

  createNewPet() {
    const newPet: Pet = {
      id: generateId(),
      category: this.getCategory(),
      name: this.createPetForm.value.name,
      photoUrls: ['aaa', 'bbb'],
      tags: this.getTags(),
      status: this.createPetForm.value.status,
    };
    console.log(newPet);

    this.petsService
      .createPet(newPet)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loader = false))
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.petTags.push({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.petTags.indexOf(tag);

    if (index >= 0) {
      this.petTags.splice(index, 1);
    }
  }

  private getCategory() {
    return {
      id: generateId(),
      name: this.createPetForm.value.category,
    };
  }

  private getTags(): PetTags[] {
    return this.petTags.map((tag) => {
      return { id: generateId(), name: tag.name };
    });
  }

  private initCreatePetForm() {
    this.createPetForm = this.formBuilder.group({
      category: ['dog', [Validators.required]],
      name: ['Niko', [Validators.required]],
      photoUrls: [''],
      tags: [''],
      status: ['', [Validators.required]],
    });
  }
}
