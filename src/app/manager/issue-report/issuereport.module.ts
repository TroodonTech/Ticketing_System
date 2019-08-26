import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IssueReportComponent } from "./issue-report.component";
import { NgDatepickerModule } from 'ng2-datepicker';

const routes: Routes = [
  {
    path: '',
    component: IssueReportComponent
  }
];

@NgModule({
  declarations: [IssueReportComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgDatepickerModule
  ]
})
export class IssuereportModule { }
