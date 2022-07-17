import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Subject, of } from 'rxjs';
import { finalize, takeUntil, switchMap } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { GetPetsByStatus } from '@state/actions/pet.action';
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
export class ListPetsComponent implements OnInit, OnDestroy {
  loader = false;
  listPetForm: FormGroup = new FormGroup({});
  statusList: Status[] = [
    { value: 'available', viewValue: 'Available' },
    { value: 'pending', viewValue: 'Pending' },
    { value: 'sold', viewValue: 'Sold' },
  ];
  petsList: any[] = [];
  rawPetsData!: any;
  private destroy$ = new Subject<void>();

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private petsService: PetsService,
    private store: Store
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

    this.store
      .dispatch(new GetPetsByStatus(statusList))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loader = false;
          this.listPetForm.reset();
          this.listPetForm.controls['status'].setErrors(null);
        }),
        switchMap((response) => {
          if (response) {
            return this.store.select((state) => state.pets.pets);
          } else {
            return of(null);
          }
        })
      )
      .subscribe({
        next: (data) => {
          if (data) {
            this.rawPetsData = data;
            this.parsePetsList(this.rawPetsData);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  parsePetsList(pets: any) {
    this.petsList = [];

    pets.forEach((item: any) => {
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
      rawData: this.rawPetsData.filter((item: Pet) => item.id === pet.id)[0],
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
