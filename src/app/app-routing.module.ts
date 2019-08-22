import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginModule } from './dashboard/login/login.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  
    {
      path:'',
      loadChildren : './dashboard/login/login.module#LoginModule'
   }

];

@NgModule({
imports: [RouterModule.forRoot(routes,{ useHash: true}),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
