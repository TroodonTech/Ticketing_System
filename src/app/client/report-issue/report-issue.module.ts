import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportIssueComponent } from "./report-issue.component";
import { FileSelectDirective } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: '',
    component: ReportIssueComponent
  }
];
@NgModule({
  declarations: [ReportIssueComponent,FileSelectDirective],
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportIssueModule { }
