import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{AdminWelcomeComponent} from './admin-welcome.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminWelcomeComponent
  }
];

@NgModule({
  declarations: [AdminWelcomeComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),
  ]
})
export class AdminWelcomeModule { }
