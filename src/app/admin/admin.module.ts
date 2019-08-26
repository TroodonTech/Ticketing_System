import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateprojectComponent } from './createproject/createproject.component';



@NgModule({
  declarations: [CreateUserComponent, ViewUserComponent, EditUserComponent, CreateprojectComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
