import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewprojectComponent } from '../../admin/viewproject/viewproject.component';

const routes: Routes = [
  {
    path: '',
    component: ViewprojectComponent
  }
  
];



@NgModule({
  declarations: [ViewprojectComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ViewprojectModule { }
