import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IssueService } from "../../../services/issue.service";

@Component({
  selector: 'app-employee-welcome',
  templateUrl: './employee-welcome.component.html',
  styleUrls: ['./employee-welcome.component.scss']
})
export class EmployeeWelcomeComponent implements OnInit {

  role;
  username;
  employeeid;
  name;
  RecentIssueList;

  constructor(private route: ActivatedRoute, private router: Router, private issueservice:IssueService) { }

  reportissue(){
    this.router.navigate(['EmployeeDashboard', { outlets: { EmployeeOut: ['CreateIssues'] } }]);}
  PTOrequest(){
    this.router.navigate(['EmployeeDashboard', { outlets: { EmployeeOut: ['PtoRequest'] } }]);}

    url_base64_decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

    this.issueservice
    .getRecentIssue(this.employeeid)
    .subscribe((data: any[]) => {
      this.RecentIssueList = data;
    });
  }

}
