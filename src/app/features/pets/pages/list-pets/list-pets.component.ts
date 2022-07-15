import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { PetsService } from '@features/pets/services/pets.service';
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

  listPetsByStatus() {
    this.loader = true;
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

  openDialog(pet: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      rawData: this.rawPetsData.filter((item) => item.id === pet.id)[0],
    };

    this.dialog.open(PetDetailsDialogComponent, dialogConfig);
  }
}

@Component({
  selector: 'pet-details-dialog',
  templateUrl: 'pet-details-dialog.component.html',
  styleUrls: ['pet-details-dialog.component.scss'],
})
export class PetDetailsDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<PetDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.dialogRef.close();
  }
}
