import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserManagerComponent } from './create-user-manager/create-user-manager.component';
import { ViewUserManagerComponent } from './view-user-manager/view-user-manager.component';
import { EditUserManagerComponent } from './edit-user-manager/edit-user-manager.component';
import { ViewIssuesComponent } from './view-issues/view-issues.component';
import { ViewPtoRequestComponent } from './view-pto-request/view-pto-request.component';
import { PtoRequestActionComponent } from './pto-request-action/pto-request-action.component';



@NgModule({
  declarations: [CreateUserManagerComponent, ViewUserManagerComponent, EditUserManagerComponent, ViewIssuesComponent, ViewPtoRequestComponent, PtoRequestActionComponent],
  imports: [
    CommonModule
  ]
})
export class ManagerModule { }
