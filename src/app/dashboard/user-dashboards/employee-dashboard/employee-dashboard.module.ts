import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes: Routes = [
  {
    path: 'EmployeeDashboard',
    component: EmployeeDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-welcome-pages/employee-welcome/employee-welcome.module#EmployeeWelcomeModule'
      }
    ]
  }
];

@NgModule({
  declarations: [EmployeeDashboardComponent],
  exports: [EmployeeDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ]
})
export class EmployeeDashboardModule { }
