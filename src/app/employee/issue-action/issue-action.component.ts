import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { IssueService } from "../../services/issue.service";
import { ActivatedRoute } from '@angular/router';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-issue-action',
  templateUrl: './issue-action.component.html',
  styleUrls: ['./issue-action.component.scss']
})
export class IssueActionComponent implements OnInit {

  role;
  username;
  employeeid;
  name;
  issueid$;
  assignedby$;
  messages;
  newmessage;
  HistoryDetails;
  IssueDetailsforEmp;
  assignedbydetails;
  startdate;
  enddate;

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

  constructor(private issueservice:IssueService,private route:ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.issueid$ = params.issueid);
    this.route.params.subscribe(params => this.assignedby$ = params.assignedby);
   }

   issueAction(){

    if (!(this.IssueDetailsforEmp.status)) {
      alert("Please enter any Status");
      return;
    }
    else if (!(this.startdate)) {
      alert("Please enter the fix start date");
      return;
    }
    else if(!(this.enddate)) {
      alert("Please enterthe fix  end date");
      return;
    }
    else if(!(this.newmessage)) {
      alert("Please enter any message");
      return;
    }

    this.issueservice
    .issueAction(this.IssueDetailsforEmp.status,this.convert_DT(this.startdate),this.convert_DT(this.enddate),this.newmessage,this.employeeid,this.issueid$)
    .subscribe((data: any[]) => {
      alert("Updated successfully!")
      this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewIssues'] } }]);
    });

   }
   goBack() {
      this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewIssues'] } }]);
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
    .getIssueDetailsforEmp(this.issueid$,this.assignedby$)
    .subscribe((data: any[]) => {
      this.IssueDetailsforEmp = data[0];
    });

    this.issueservice
    .getMessages(this.issueid$)
    .subscribe((data: any[]) => {
      this.messages = data;
    });

  }

}
