import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{ClientWelcomeModule } from '../../user-welcome-pages/client-welcome/client-welcome.module'
import { ReportIssueModule } from "../../../client/report-issue/report-issue.module";

const routes: Routes = [
  {
    path: 'ClientDashboard',
    component: ClientDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'ClientOut',
        loadChildren: '../../user-welcome-pages/client-welcome/client-welcome.module#ClientWelcomeModule'
      },
      {
        path: 'ReportIssue',
        outlet: 'ClientOut',
        loadChildren: '../../../client/report-issue/report-issue.module#ReportIssueModule'
      },
      
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
