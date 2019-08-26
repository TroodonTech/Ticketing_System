import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerDashboardComponent } from './manager-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{CreateUserManagerModule} from '../../../manager/create-user-manager/create-user-manager.module'
import{ SetUPModule} from '../../set-u-p/set-u-p.module'
import { ViewIssuesModule } from "../../../manager/view-issues/view-issues.module";
import { ViewPtoRequestModule } from "../../../manager/view-pto-request/view-pto-request.module";
import { PtoRequestActionModule } from "../../../manager/pto-request-action/pto-request-action.module";
import { IssueDetailsModule } from "../../../manager/issue-details/issue-details.module";
import { IssueAssignModule } from "../../../manager/issue-assign/issue-assign.module";
import { CreateIssueModule } from "../../../manager/create-issue/create-issue.module";
import { IssuereportModule } from "../../../manager/issue-report/issuereport.module";

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
      
      {
        path: 'CreateUser',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/create-user-manager/create-user-manager.module#CreateUserManagerModule',

      },
      {
        path: 'ViewUser',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/view-user-manager/view-user-manager.module#ViewUserManagerModule',

      },
      {
        path: 'EditUser',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/edit-user-manager/edit-user-manager.module#EditUserManagerModule',

      },
      {
        path: 'SetUP/:userroletype_id/:EmailID',
        outlet: 'ManagerOut',
        loadChildren: '../../set-u-p/set-u-p.module#SetUPModule',
      },
      {
        path: 'ViewPtoRequest',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/view-pto-request/view-pto-request.module#ViewPtoRequestModule',
      },
      {
        path: 'ViewPtoRequest/PTORequestAction/:ptorequest_id',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/pto-request-action/pto-request-action.module#PtoRequestActionModule',
      },
      {
        path: 'ViewIssues',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/view-issues/view-issues.module#ViewIssuesModule',
      },
      {
        path: 'ViewIssues/IssueDetails/:issue_id',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/issue-details/issue-details.module#IssueDetailsModule',
      },
      {
        path: 'ViewIssues/IssueAssign/:issue_id',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/issue-assign/issue-assign.module#IssueAssignModule',
      },
      {
        path: 'CreateIssue',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/create-issue/create-issue.module#CreateIssueModule',
      },
      {
        path: 'Issuereport',
        outlet: 'ManagerOut',
        loadChildren: '../../../manager/issue-report/issuereport.module#IssuereportModule',
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
