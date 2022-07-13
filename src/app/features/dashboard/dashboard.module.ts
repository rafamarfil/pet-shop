import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { AuthGuard } from '@core/guards/auth.guards';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  exports: [],
  declarations: [...DashboardRoutingModule.components],
  providers: [AuthGuard],
})
export class DashboardModule {}
