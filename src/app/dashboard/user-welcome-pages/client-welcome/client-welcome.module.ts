import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientWelcomeComponent } from './client-welcome.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientWelcomeComponent
  }
];


@NgModule({
  declarations: [ClientWelcomeComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ]
})
export class ClientWelcomeModule { }
