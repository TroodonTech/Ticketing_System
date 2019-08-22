import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ManagerWelcomeComponent} from './manager-welcome.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ManagerWelcomeComponent
  }
];


@NgModule({
  declarations: [ManagerWelcomeComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),
  ]
})
export class ManagerWelcomeModule { }
