import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ViewIssuesModule } from "../../../employee/view-issues/view-issues.module";
import { PtoRequestModule } from "../../../employee/pto-request/pto-request.module";
import { ViewPtoRequestModule } from "../../../employee/view-pto-request/view-pto-request.module";
import { IssueActionModule } from "../../../employee/issue-action/issue-action.module";
import { EditPtoRequestModule } from "../../../employee/edit-pto-request/edit-pto-request.module";

const routes: Routes = [
  {
    path: 'EmployeeDashboard',
    component: EmployeeDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'EmployeeOut',
        loadChildren: '../../user-welcome-pages/employee-welcome/employee-welcome.module#EmployeeWelcomeModule'
      },
      {
        path: 'ViewIssues',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/view-issues/view-issues.module#ViewIssuesModule'
      },
      {
        path: 'ViewIssues/IssueAction/:issueid/:assignedby',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/issue-action/issue-action.module#IssueActionModule'
      },
      {
        path: 'PtoRequest',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/pto-request/pto-request.module#PtoRequestModule'
      },
      {
        path: 'ViewPtoRequest',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/view-pto-request/view-pto-request.module#ViewPtoRequestModule'
      },
      {
        path: 'ViewPtoRequest/PTORequestEdit/:request_id',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/edit-pto-request/edit-pto-request.module#EditPtoRequestModule'
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
