import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIssuesComponent } from './view-issues/view-issues.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';



@NgModule({
  declarations: [ViewIssuesComponent, HistoryDetailsComponent],
  imports: [
    CommonModule
  ]
})
export class ClientModule { }
