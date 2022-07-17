import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { CreatePet } from '@state/actions/pet.action';
import { generateId } from '@core/utils/utils';
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
export class CreatePetComponent implements OnInit, OnDestroy {
  createPetForm!: FormGroup;
  loader = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  petTags: Tag[] = [];
  selectedValue!: string;
  statusValues: Status[] = [
    { value: 'available', viewValue: 'Available' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'sold', viewValue: 'Sold' },
  ];
  private destroy$ = new Subject<void>();

  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit() {
    this.initCreatePetForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createNewPet() {
    this.loader = true;
    const newPet: Pet = {
      id: generateId(),
      category: this.getCategory(),
      name: this.createPetForm.value.name,
      photoUrls: [this.createPetForm.value.imageUrl],
      tags: this.getTags(),
      status: this.createPetForm.value.status,
    };

    this.store
      .dispatch(new CreatePet(newPet))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loader = false;
          this.resetForm();
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(`Pet created successfully`, '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
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
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      photoUrls: [''],
      tags: [''],
      status: ['', [Validators.required]],
      imageUrl: [''],
    });
  }

  private resetForm() {
    this.createPetForm.reset();
    this.createPetForm.controls['category'].setErrors(null);
    this.createPetForm.controls['name'].setErrors(null);
    this.createPetForm.controls['status'].setErrors(null);
    this.petTags = [];
  }
}
