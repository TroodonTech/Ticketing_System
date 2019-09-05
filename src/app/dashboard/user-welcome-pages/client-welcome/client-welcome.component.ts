import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IssueService } from "../../../services/issue.service";

@Component({
  selector: 'app-client-welcome',
  templateUrl: './client-welcome.component.html',
  styleUrls: ['./client-welcome.component.scss']
})
export class ClientWelcomeComponent implements OnInit {
  username;
  role;
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

  reportissue(){
    this.router.navigate(['ClientDashboard', { outlets: { ClientOut: ['ReportIssue'] } }]);
  }
  viewissues(){
    this.router.navigate(['ClientDashboard', { outlets: { ClientOut: ['ViewIssues'] } }]);
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
    .getRecentIssueforClient(this.employeeid)
    .subscribe((data: any[]) => {
      this.RecentIssueList = data;
    });
  }

}
