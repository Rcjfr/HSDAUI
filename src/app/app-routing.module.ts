import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from '@app/components/alerts/alerts.component';
import { AlertDetailComponent } from '@app/components/alert-detail/alert-detail.component';
import { PendingChangesGuard } from '@app/common/components/pending-changes.guard';
import { SdaResolverService } from '@app/common/resolvers/sda-resolver.service';
import { AuthGuardService } from '@app/common/services/auth-guard.service';
import { AlertsDashboardComponent } from '@app/components/alerts-dashboard/alerts-dashboard.component';
const routes: Routes = [
  {
    path: 'dashboard', component: AlertsDashboardComponent,
    children: []
  },
  {
    path: 'alerts', component: AlertsComponent,
    children: []
  },
  {
    path: 'alerts/:id', component: AlertDetailComponent,
    //resolve: { sda: SdaResolverService },
    canActivate: [AuthGuardService],
    canDeactivate: [PendingChangesGuard],
    children: []
  },
  { path: '', redirectTo: 'alerts', pathMatch: 'full' },
  { path: '*', redirectTo: 'alerts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
