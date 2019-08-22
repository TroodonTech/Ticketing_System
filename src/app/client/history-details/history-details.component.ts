import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { IssueService } from "../../services/issue.service";

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit {

  role;
  username;
  employeeid;
  name;
  IssueTypeList;
  issuetype;
  getpriorityList;
  priority;
  Description;


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

  constructor(private fb: FormBuilder,private issueservice:IssueService, private router: Router) { }

  
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
      alert("Please choose issuetype");
      return;
    }
    else if(!(this.Description)){
      alert("Please choose Description");
      return;
    }
    else if(!(this.priority)){
      alert("Please choose priority");
      return;
    }
    this.issueservice.submitIssue(this.issuetype,this.Description,this.priority)
    .subscribe((data: any[]) => {
      alert('Issue Reported Successfully!');
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


    this.issueservice
    .getIssueType()
    .subscribe((data: any[]) => {
      this.IssueTypeList = data;
    });
    this.issueservice
    .getpriority()
    .subscribe((data: any[]) => {
      this.getpriorityList = data;
    });
  }

}
