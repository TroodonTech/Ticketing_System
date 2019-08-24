import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIssuesComponent } from './view-issues/view-issues.component';
import { PtoRequestComponent } from './pto-request/pto-request.component';
import { ViewPtoRequestComponent } from './view-pto-request/view-pto-request.component';
import { IssueActionComponent } from './issue-action/issue-action.component';
import { EditPtoRequestComponent } from './edit-pto-request/edit-pto-request.component';
import { PtoRequestDetailsComponent } from './pto-request-details/pto-request-details.component';



@NgModule({
  declarations: [ViewIssuesComponent, PtoRequestComponent, ViewPtoRequestComponent, IssueActionComponent, EditPtoRequestComponent, PtoRequestDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
