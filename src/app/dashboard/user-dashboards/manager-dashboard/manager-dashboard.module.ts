import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{CreateUserManagerModule} from '../../../manager/create-user-manager/create-user-manager.module'

const routes: Routes = [
  {
    path: 'ManagerDashBoard',
    component: ManagerDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'ManagerOut',
        loadChildren: '../../user-welcome-pages/welcomepage/welcomepage.module#WelcomepageModule',

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
