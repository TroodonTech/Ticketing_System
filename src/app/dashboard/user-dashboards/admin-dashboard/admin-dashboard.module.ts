import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{RequestviewModule } from '../../../admin/requestview/requestview.module'

const routes: Routes = [
  {
    path: 'AdminDashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'welcomePage',
        outlet: 'AdminOut',
        loadChildren: '../../user-welcome-pages/admin-welcome/admin-welcome.module#AdminWelcomeModule'
      },
      {
        path: 'CreateUser',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/create-user/create-user.module#CreateUserModule'
      },
      {
        path: 'ViewUser',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/view-user/view-user.module#ViewUserModule'
      },
      {
        path: 'EditUser/:employee_id',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/edit-user/edit-user.module#EditUserModule'
      },
      {
        path: 'SetUP/:userroletype_id/:EmailID',
        outlet: 'AdminOut',
        loadChildren: '../../set-u-p/set-u-p.module#SetUPModule'
      },
      {
        path: 'CreateProject',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/createproject/createproject.module#CreateprojectModule'
      },
      {
        path: 'ViewProject',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/viewproject/viewproject.module#ViewprojectModule'
      },
      {
        path: 'Request',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/requestview/requestview.module#RequestviewModule'
      }
    ]
  }
];

@NgModule({
  declarations: [AdminDashboardComponent],
  exports: [AdminDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MDBBootstrapModule.forRoot()
  ]
})
export class AdminDashboardModule { }
