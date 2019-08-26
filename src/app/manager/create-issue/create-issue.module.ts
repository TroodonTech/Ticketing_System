import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateIssueComponent } from "./create-issue.component";
import { NgDatepickerModule } from 'ng2-datepicker';

const routes: Routes = [
  {
    path: '',
    component: CreateIssueComponent
  }
];

@NgModule({
  declarations: [CreateIssueComponent],
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
export class CreateIssueModule { }
