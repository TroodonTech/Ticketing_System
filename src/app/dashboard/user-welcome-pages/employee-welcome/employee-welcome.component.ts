import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-employee-welcome',
  templateUrl: './employee-welcome.component.html',
  styleUrls: ['./employee-welcome.component.scss']
})
export class EmployeeWelcomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  reportissue(){
    this.router.navigate(['EmployeeDashboard', { outlets: { EmployeeOut: ['CreateIssues'] } }]);}
  PTOrequest(){
    this.router.navigate(['EmployeeDashboard', { outlets: { EmployeeOut: ['PtoRequest'] } }]);}
  ngOnInit() {
  }

}
