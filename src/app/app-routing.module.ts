import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginModule } from './dashboard/login/login.module';

const routes: Routes = [
  
    {
      path:'',
      loadChildren : './dashboard/login/login.module#LoginModule'
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
