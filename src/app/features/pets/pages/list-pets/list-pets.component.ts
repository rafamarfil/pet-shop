import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PetsService } from '@features/pets/pets.service';
import { Pet } from '../../models/pet.model';

interface Status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'list-pets',
  templateUrl: 'list-pets.component.html',
  styleUrls: ['list-pets.component.scss'],
})
export class ListPetsComponent implements OnInit {
  loader = false;
  listPetForm: FormGroup = new FormGroup({});
  statusList: Status[] = [
    { value: 'available', viewValue: 'Available' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'sold', viewValue: 'Sold' },
  ];
  petsList: any[] = [];
  rawPetsData!: Pet[];
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private petsService: PetsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.listPetForm = this.formBuilder.group({
      status: ['', [Validators.required]],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() {
    return this.listPetForm.controls;
  }

  listPetsByStatus() {
    const statusList: string[] = this.listPetForm.value.status;

    this.petsService
      .getPetsByStatus(statusList)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loader = false;
          this.listPetForm.reset();
          this.listPetForm.controls['status'].setErrors(null);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response) {
            this.rawPetsData = response;
            this.parsePetsList(response);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  parsePetsList(pets: Pet[]) {
    this.petsList = [];
    pets.forEach((item) => {
      this.petsList.push({
        id: item.id,
        name: item.name,
        status: item.status,
      });
    });
  }

  openPetDetails(pet: any) {
    this.dialog.open(PetDetailsDialog, {
      data: {
        rawData: this.rawPetsData.filter((item) => item.id === pet.id)[0],
      },
    });
  }
}

@Component({
  selector: 'pet-details-dialog',
  templateUrl: './pet-details-dialog.html',
})
export class PetDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
