import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AuthGuard } from '@core/guards/auth.guards';
import { PetsRoutingModule } from './pets.routing.module';

@NgModule({
  imports: [PetsRoutingModule, SharedModule],
  exports: [],
  declarations: [...PetsRoutingModule.components],
  providers: [AuthGuard],
})
export class PetsModule {}
