import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ViewIssuesModule } from "../../../employee/view-issues/view-issues.module";
import { CreateIssuesModule } from "../../../employee/create-issues/create-issues.module";
import { PtoRequestModule } from "../../../employee/pto-request/pto-request.module";
import { ViewPtoRequestModule } from "../../../employee/view-pto-request/view-pto-request.module";
import { IssueActionModule } from "../../../employee/issue-action/issue-action.module";
import { EditPtoRequestModule } from "../../../employee/edit-pto-request/edit-pto-request.module";
import { PtoRequestDetailsModule } from "../../../employee/pto-request-details/pto-request-details.module";
import { IssueActionEmpModule } from "../../../employee/issue-action-emp/issue-action-emp.module";
import { IssueResolvedModule } from "../../../employee/issue-resolved/issue-resolved.module";

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
        path: 'CreateIssues',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/create-issues/create-issues.module#CreateIssuesModule'
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
        path: 'ViewIssues/IssueActionEmp/:issueid/:assignedby',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/issue-action-emp/issue-action-emp.module#IssueActionEmpModule'
      },
      {
        path: 'ViewIssues/IssueResolved/:issueid/:assignedby',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/issue-resolved/issue-resolved.module#IssueResolvedModule'
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
      },
      {
        path: 'ViewPtoRequest/PTORequestDetails/:request_id',
        outlet: 'EmployeeOut',
        loadChildren: '../../../employee/pto-request-details/pto-request-details.module#PtoRequestDetailsModule'
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
