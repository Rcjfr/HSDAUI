import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AlertDetailComponent } from './components/alert-detail/alert-detail.component';
import { PendingChangesGuard } from './common/components/pending-changes.guard';
import { SdaResolverService } from './common/resolvers/sda-resolver.service';
import { AuthGuardService } from './common/services/auth-guard.service';
const routes: Routes = [
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
