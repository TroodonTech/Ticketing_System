import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ClientWelcomeModule } from '../../user-welcome-pages/client-welcome/client-welcome.module'
import { ReportIssueModule } from "../../../client/report-issue/report-issue.module";
import { ViewIssuesModule } from "../../../client/view-issues/view-issues.module";
import { HistoryDetailsModule } from "../../../client/history-details/history-details.module";

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
      {
        path: 'ViewIssues',
        outlet: 'ClientOut',
        loadChildren: '../../../client/view-issues/view-issues.module#ViewIssuesModule'
      },
      {
        path: 'ViewIssues/HistoryDetails/:issueid',
        outlet: 'ClientOut',
        loadChildren: '../../../client/history-details/history-details.module#HistoryDetailsModule'
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
