import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IssueService } from "../../services/issue.service";
import { ActivatedRoute } from '@angular/router';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-issue-assign',
  templateUrl: './issue-assign.component.html',
  styleUrls: ['./issue-assign.component.scss']
})
export class IssueAssignComponent implements OnInit {

     /////////////////////////////////Author:Aswathy///////////////

  role;
  username;
  employeeid;
  name;
  issueid$;
  messages;
  newmessage;
  HistoryDetails;
  IssueDetailsforManager;
  assignedbydetails;
  startdate;
  enddate;
  marked = false;
  IssueNumber;
  theCheckbox;
  duplicateissueid;
  Issuetype;
  IssueTypeid;
  AllEmployees;
  employee;
  imageflag=false;


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

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: '', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  toggleVisibility(e) {
    if (e.target.checked) {
      this.marked = true;
    } else {
      this.marked = false;
    }
  }

  constructor(private issueservice:IssueService,private route:ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.issueid$ = params.issue_id);
   }

   issueAssign(){

    if (!(this.IssueTypeid)) {
      alert("Please enter Issue Type");
      return;
    }
    if (!(this.employee)) {
      alert("Please choose an employee ");
      return;
    }

    this.issueservice
    .issueAssign(this.IssueTypeid,this.employee,this.employeeid,this.issueid$)
    .subscribe((data: any[]) => {
      alert("Updated successfully!")
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewIssues'] } }]);
    });

   }
   goBack() {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewIssues'] } }]);
    }

    duplicateAction(){

      if (!(this.duplicateissueid)) {
        alert("Please enter the Reference Number");
        return;
      }

      this.issueservice
      .duplicateAction(this.issueid$,this.duplicateissueid)
      .subscribe((data: any[]) => {
        alert("Updated successfully!")
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

    this.duplicateissueid="";
    this.IssueTypeid="";
    this.employee="";

    this.issueservice
    .getIssueDetailsforManager(this.issueid$)
    .subscribe((data: any[]) => {
      this.IssueDetailsforManager = data[0];
      if(this.IssueDetailsforManager.imagename!=null){
        this.imageflag=true;
      }
      else{
        this.imageflag=false;
      }
    });

    this.issueservice
    .getMessages(this.issueid$)
    .subscribe((data: any[]) => {
      this.messages = data;
    });

    this.issueservice
    .getIssueNumber(this.issueid$,this.employeeid)
    .subscribe((data: any[]) => {
      this.IssueNumber = data;

    });

    this.issueservice
    .getIssuetype()
    .subscribe((data: any[]) => {
      this.Issuetype = data;
    });

    this.issueservice
    .getAllEmployees()
    .subscribe((data: any[]) => {
      this.AllEmployees = data;
    });
  }

}
