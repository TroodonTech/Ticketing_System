import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditUserComponent } from '../../admin/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: EditUserComponent
  }
  
];



@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class EditUserModule { }
