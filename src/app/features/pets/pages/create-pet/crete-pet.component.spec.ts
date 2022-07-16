import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@shared/shared.module';
import { CreatePetComponent } from './create-pet.component';
import { PetsService } from '../../services/pets.service';
import { FakePetsService } from '../../../../../test/fakes.spec';

describe('CreatePetComponent', () => {
  let component: CreatePetComponent;
  let fixture: ComponentFixture<CreatePetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [CreatePetComponent],
      providers: [{ provide: PetsService, useClass: FakePetsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with category, name, photoUrls, tags, status and imageUrl controls', () => {
    expect(component.createPetForm.contains('category')).toBeTruthy();
    expect(component.createPetForm.contains('name')).toBeTruthy();
    expect(component.createPetForm.contains('photoUrls')).toBeTruthy();
    expect(component.createPetForm.contains('tags')).toBeTruthy();
    expect(component.createPetForm.contains('status')).toBeTruthy();
    expect(component.createPetForm.contains('imageUrl')).toBeTruthy();
  });
});
