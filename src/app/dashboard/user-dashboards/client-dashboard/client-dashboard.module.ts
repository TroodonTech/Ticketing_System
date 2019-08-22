import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{ClientWelcomeModule } from '../../user-welcome-pages/client-welcome/client-welcome.module'

const routes: Routes = [
  {
    path: 'ClientDashboard',
    component: ClientDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'ClientOut',
        loadChildren: '../../user-welcome-pages/client-welcome/client-welcome.module#ClientWelcomeModule'
      }
    ]
  }
];

@NgModule({
  declarations: [ClientDashboardComponent],
  exports: [ClientDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ]
})
export class ClientDashboardModule { }
