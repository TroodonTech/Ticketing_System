import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { IssueService } from "../../services/issue.service";
import { ActivatedRoute } from '@angular/router';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-issue-resolved',
  templateUrl: './issue-resolved.component.html',
  styleUrls: ['./issue-resolved.component.scss']
})
export class IssueResolvedComponent implements OnInit {

  /////////////////////////////////Author:Aswathy///////////////

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
  marked = false;
  request = false;
  IssueNumber;
  theCheckbox;
  duplicateissueid;
  status;
  assignedbyflag = true;
  IssueType;
  issuetype_id;
  imageflag=false;

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
    addStyle: { 'font-size': '18px', 'width': '75%','background-color':'white', 'border': '1px solid #ced4da', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

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

  constructor(private issueservice:IssueService,private route:ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.issueid$ = params.issueid);
    this.route.params.subscribe(params => this.assignedby$ = params.assignedby);
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

      if(this.HistoryDetails.imagename!=null){
        this.imageflag=true;
      }
      else{
        this.imageflag=false;
      }

      if(this.IssueDetailsforEmp.assignedby=='2'){
          this.assignedbyflag=false;
      }
      else{
        this.assignedbyflag=false;
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
    .getIssueType()
    .subscribe((data: any[]) => {
      this.IssueType = data;
    });
  }

}
