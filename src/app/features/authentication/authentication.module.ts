import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication.routing.module';
import { SharedModule } from '@shared/shared.module';
import { AuthGuard } from '@core/guards/auth.guards';

@NgModule({
  imports: [AuthenticationRoutingModule, SharedModule],
  exports: [],
  declarations: [...AuthenticationRoutingModule.components],
  providers: [AuthGuard],
})
export class AuthenticationModule {}
