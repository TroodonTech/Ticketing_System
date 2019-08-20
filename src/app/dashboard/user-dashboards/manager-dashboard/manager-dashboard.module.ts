import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const routes: Routes = [
  {
    path: 'ManagerDashBoard',
    component: ManagerDashboardComponent,
    children: [
      {
        path: 'Buildview',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/inventory/building-view/building-view.module#BuildingViewModule',

      }
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
