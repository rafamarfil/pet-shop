import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AuthGuard } from '@core/guards/auth.guards';
import { PetsRoutingModule } from './pets.routing.module';

@NgModule({
  imports: [SharedModule, PetsRoutingModule],
  exports: [],
  declarations: [...PetsRoutingModule.components],
  providers: [AuthGuard],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PetsModule {}
