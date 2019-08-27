import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { ManagerWelcomeComponent } from './manager-welcome/manager-welcome.component';
import { EmployeeWelcomeComponent } from './employee-welcome/employee-welcome.component';
import { ClientWelcomeComponent } from './client-welcome/client-welcome.component';



@NgModule({
  declarations: [AdminWelcomeComponent, ManagerWelcomeComponent, EmployeeWelcomeComponent, ClientWelcomeComponent],
  imports: [
    CommonModule
  ]
})
export class UserWelcomePagesModule { }
