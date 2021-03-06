import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './create-user/create-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateprojectComponent } from './createproject/createproject.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';
import { RequestviewComponent } from './requestview/requestview.component';



@NgModule({
  declarations: [CreateUserComponent, ViewUserComponent, EditUserComponent, CreateprojectComponent, ViewprojectComponent, RequestviewComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
