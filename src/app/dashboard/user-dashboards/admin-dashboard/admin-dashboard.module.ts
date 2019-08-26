import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import{SetUPModule} from '../../set-u-p/set-u-p.module'

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
        path: 'CreateProject',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/createproject/createproject.module#CreateprojectModule'
      },
      {
        path: 'ViewUser',
        outlet: 'AdminOut',
        loadChildren: '../../../admin/view-user/view-user.module#ViewUserModule'
      },
      {
        path: 'SetUP',
        outlet: 'AdminOut',
        loadChildren: '../../set-u-p/set-u-p.module#SetUPModule'
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
