import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [CreateUserComponent, ViewUserComponent, EditUserComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
