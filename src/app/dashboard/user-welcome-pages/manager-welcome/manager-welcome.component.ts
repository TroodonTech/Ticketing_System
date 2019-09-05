import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IssueService } from "../../../services/issue.service";

@Component({
  selector: 'app-manager-welcome',
  templateUrl: './manager-welcome.component.html',
  styleUrls: ['./manager-welcome.component.scss']
})
export class ManagerWelcomeComponent implements OnInit {

  role;
  username;
  employeeid;
  name;
  RecentIssueList;

  constructor(private route: ActivatedRoute, private router: Router, private issueservice:IssueService) { }

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

  createuser(){
    this.router.navigate(['ManagerDashBoard', { outlets: { ManagerOut: ['CreateUser'] } }]);
  }

  createissue(){
    this.router.navigate(['ManagerDashBoard', { outlets: { ManagerOut: ['CreateIssue'] } }]);
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
