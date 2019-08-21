import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{ManagerWelcomeModule} from '../../../dashboard/user-welcome-pages/manager-welcome/manager-welcome.module'

const routes: Routes = [
  {
    path: 'ManagerDashBoard',
    component: ManagerDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'ManagerOut',
        loadChildren: '../../../dashboard/user-welcome-pages/manager-welcome/manager-welcome.module#ManagerWelcomeModule',

      },
    ]}
  ];


@NgModule({
  declarations: [ManagerDashboardComponent],
  exports: [ ManagerDashboardComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ]
})
export class ManagerDashboardModule { }
