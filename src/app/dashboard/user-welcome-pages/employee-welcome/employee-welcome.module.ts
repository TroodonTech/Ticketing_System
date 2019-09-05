import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeWelcomeComponent } from './employee-welcome.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmployeeWelcomeComponent
  }
];


@NgModule({
  declarations: [EmployeeWelcomeComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class EmployeeWelcomeModule { }
