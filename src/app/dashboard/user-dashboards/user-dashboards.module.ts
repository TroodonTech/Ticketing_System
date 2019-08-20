import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';



@NgModule({
  declarations: [AdminDashboardComponent, ManagerDashboardComponent, EmployeeDashboardComponent, ClientDashboardComponent],
  imports: [
    CommonModule
  ]
})
export class UserDashboardsModule { }
