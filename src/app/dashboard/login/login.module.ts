import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes,RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AdminDashboardModule } from "../../dashboard/user-dashboards/admin-dashboard/admin-dashboard.module";
import { ClientDashboardModule } from "../../dashboard/user-dashboards/client-dashboard/client-dashboard.module";
import { ManagerDashboardModule } from "../../dashboard/user-dashboards/manager-dashboard/manager-dashboard.module";
import { EmployeeDashboardModule } from "../../dashboard/user-dashboards/employee-dashboard/employee-dashboard.module";


const routes: Routes = [
  
  {
    path:'',
    component : LoginComponent
 }

];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    AdminDashboardModule,
    ClientDashboardModule,
    ManagerDashboardModule,
    EmployeeDashboardModule
  ]
})
export class LoginModule { }
