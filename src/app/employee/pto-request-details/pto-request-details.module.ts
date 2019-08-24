import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PtoRequestDetailsComponent } from "./pto-request-details.component";
import { NgDatepickerModule } from 'ng2-datepicker';

const routes: Routes = [
  {
    path: '',
    component: PtoRequestDetailsComponent
  }
];

@NgModule({
  declarations: [PtoRequestDetailsComponent],
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
export class PtoRequestDetailsModule { }
