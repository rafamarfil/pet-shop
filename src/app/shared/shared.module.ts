import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SpinnerComponent } from './ui-components/ui-spinner/spinner.component';

const DIRECTIVES = [];
const PAGES = [NotFoundComponent];
const PIPES = [];
const UICOMPONENTS = [];

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    ...PAGES,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SpinnerComponent,
  ],
  declarations: [...PAGES, SpinnerComponent],
  providers: [],
})
export class SharedModule {}
