import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IssueService } from "../../services/issue.service";

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {

     /////////////////////////////////Author:Aswathy///////////////

  role;
  username;
  employeeid;
  name;
  IssueTypeList;
  issuetype;
  getpriorityList;
  priority;
  Description;
  AllEmployees;
  employee;


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

  constructor(private issueservice:IssueService, private router: Router) { }

  
  numberValid(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  charValidation(event: any) {
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
  }

  ReportIssue() {
    if (!(this.issuetype)) {
      alert("Please choose Issue Type");
      return;
    }
    if (!(this.employee)) {
      alert("Please choose any Employee");
      return;
    }
    if(!(this.Description)){
      alert("Please enter Description");
      return;
    }
    else if(!(this.priority)){
      alert("Please choose Priority");
      return;
    }
    this.issueservice.submitIssuebyManager(this.issuetype,this.employee,this.Description,this.priority,this.employeeid)
    .subscribe((data: any[]) => {
      alert('Issue Reported Successfully!');
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewIssues'] } }]);
    });

  }
  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

    this.issuetype="";
    this.priority="";
    this.employee="";

    this.issueservice
    .getIssuetype()
    .subscribe((data: any[]) => {
      this.IssueTypeList = data;
    });
    this.issueservice
    .getpriority()
    .subscribe((data: any[]) => {
      this.getpriorityList = data;
    });
    this.issueservice
    .getAllEmployees()
    .subscribe((data: any[]) => {
      this.AllEmployees = data;
    });

  }

}
