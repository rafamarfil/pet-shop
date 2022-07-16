import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { FakeAuthenticationService } from 'src/test/fakes.spec';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
      ],
      providers: [
        { provide: AuthService, useClass: FakeAuthenticationService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with username, email, password and passwordConfirmation controls', () => {
    expect(component.form.contains('username')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
    expect(component.form.contains('passwordConfirmation')).toBeTruthy();
  });
});
