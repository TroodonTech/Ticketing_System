import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminWelcomeComponent } from './admin-welcome/admin-welcome.component';
import { ManagerWelcomeComponent } from './manager-welcome/manager-welcome.component';
import { EmployeeWelcomeComponent } from './employee-welcome/employee-welcome.component';
import { ClientWelcomeComponent } from './client-welcome/client-welcome.component';



@NgModule({
  declarations: [WelcomeComponent, AdminWelcomeComponent, ManagerWelcomeComponent, EmployeeWelcomeComponent, ClientWelcomeComponent],
  imports: [
    CommonModule
  ]
})
export class UserWelcomePagesModule { }
