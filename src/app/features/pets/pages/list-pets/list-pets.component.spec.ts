import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { ListPetsComponent } from './list-pets.component';
import { PetsService } from '../../services/pets.service';
import { FakePetsService } from '../../../../../test/fakes.spec';

describe('ListPetsComponent', () => {
  let component: ListPetsComponent;
  let fixture: ComponentFixture<ListPetsComponent>;
  let mockPetService: any;
  let PETS: { id: number; name: string; status: string }[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [ListPetsComponent],
      providers: [{ provide: PetsService, useClass: FakePetsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
