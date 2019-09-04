import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-manager-welcome',
  templateUrl: './manager-welcome.component.html',
  styleUrls: ['./manager-welcome.component.scss']
})
export class ManagerWelcomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  createuser(){
    this.router.navigate(['ManagerDashBoard', { outlets: { ManagerOut: ['CreateUser'] } }]);}
  createissue(){
    this.router.navigate(['ManagerDashBoard', { outlets: { ManagerOut: ['CreateIssue'] } }]);}
  ngOnInit() {
  }

}
