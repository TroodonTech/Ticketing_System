import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUserManagerComponent } from './create-user-manager/create-user-manager.component';
import { ViewUserManagerComponent } from './view-user-manager/view-user-manager.component';
import { EditUserManagerComponent } from './edit-user-manager/edit-user-manager.component';



@NgModule({
  declarations: [CreateUserManagerComponent, ViewUserManagerComponent, EditUserManagerComponent],
  imports: [
    CommonModule
  ]
})
export class ManagerModule { }
