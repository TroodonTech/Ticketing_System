import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewPtoRequestComponent } from "./view-pto-request.component";

const routes: Routes = [
  {
    path: '',
    component: ViewPtoRequestComponent
  }
];

@NgModule({
  declarations: [ViewPtoRequestComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewPtoRequestModule { }
