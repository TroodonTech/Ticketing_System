import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { IssueService } from "../../services/issue.service";
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit {

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

  public uploader: FileUploader = new FileUploader({ url: '', itemAlias: 'photo' });
  
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
    // this.addUrl = '?formtypeId=' + this.FormtypeId + '&formDesc=' + this.DescName + '&empkey=' + this.employeekey + '&OrganizationID=' + this.OrganizationID;
    // this.uploader.onBeforeUploadItem = (item) => {
    //   item.withCredentials = false;
    //   item.url = url + this.addUrl;
    // }
    // this.uploader.uploadAll();
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

    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log('ImageUpload:uploaded:', item, status, response);
    //   alert('File uploaded successfully');
    // };
  }

}
