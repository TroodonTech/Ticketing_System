import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.scss']
})
export class AdminWelcomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  callCreateWO(){
  this.router.navigate(['AdminDashboard', { outlets: { AdminOut: ['CreateUser'] } }]);}
  callCreateProject(){
    
    this.router.navigate(['AdminDashboard', { outlets: { AdminOut: ['CreateProject'] } }]);}
  ngOnInit() {
  }

}
