import { Component, OnInit } from '@angular/core';
import { IssueService } from "../../services/issue.service";
import { DatepickerOptions } from 'ng2-datepicker';
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.scss']
})
export class ViewIssuesComponent implements OnInit {

     /////////////////////////////////Author:Aswathy///////////////

  role: String;
  name: String;
  username;
  employeeid;
  issuedetails;
  checkflag;
  checkValue = [];
  DuplicateValues = [];
  marked = false;
  deleteKey;
  fromdate;
  todate;
  IssueStatus;
  statuslabels;
  issue;

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    //locale: frLocale,
    //minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  deletePass(key) {
    this.deleteKey = key;

  }
  deleteIssues() {
    this.IssueService.deleteIssues(this.deleteKey)
      .subscribe((data) => {
        // alert('Issue Deleted Successfully');
        // this.IssueService.getAllIssues(this.issue)
        // .subscribe((data: any[]) => {
        //   this.issuedetails = data;
        // });
      });
  }

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
  constructor(private IssueService: IssueService,private router: Router) { }

  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  viewissues(fromdate, todate, IssueStatus) {

    if ((todate) && (this.convert_DT(fromdate) > this.convert_DT(todate))) {
      todate = null;
      alert("Please check your Start Date!");
      return;
    }
    else {
      var fdate;
      var tdate;
      fdate = this.convert_DT(fromdate);
      tdate = this.convert_DT(todate);

      var Status;
      if (!IssueStatus) {
        Status = null;
      }
      else {
        Status = IssueStatus;
      }

      this.issue = {
        employeekey: this.employeeid,
        fromdate: fdate,
        todate: tdate,
        Status: Status
      };

      this.IssueService.getAllIssues(this.issue)
      .subscribe((data: any[]) => {
        this.issuedetails = data;
      });
    }
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

    this.checkflag=false;

    this.fromdate = new Date(Date.now());
    this.todate = new Date(Date.now());
    this.fromdate = this.convert_DT(this.fromdate);
    this.todate = this.convert_DT(this.todate);
    this.IssueStatus = "";

    var IssueStatus = null;

    this.issue = {
      employeekey: this.employeeid,
      fromdate: this.fromdate,
      todate: this.todate,
      Status: IssueStatus
    };

    this.IssueService.getAllIssues(this.issue)
    .subscribe((data: any[]) => {
      this.issuedetails = data;
    });
    
    this.IssueService.getStatus()
    .subscribe((data: any[]) => {
      this.statuslabels = data;
    });

  }
  
}
