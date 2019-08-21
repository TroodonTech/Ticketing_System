import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{AdminWelcomeModule} from '../../user-welcome-pages/admin-welcome/admin-welcome.module'

const routes: Routes = [
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'AdminOut',
        loadChildren: '../../user-welcome-pages/admin-welcome/admin-welcome.module#AdminWelcomeModule'
      }
    ]
  }
];

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ]
})
export class AdminDashboardModule { }
