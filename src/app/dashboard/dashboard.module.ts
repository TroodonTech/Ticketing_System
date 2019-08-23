import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SetUPComponent } from './set-u-p/set-u-p.component';



@NgModule({
  declarations: [LoginComponent, SetUPComponent],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
