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

  toggleVisibility1(e) {
    if (e.target.checked) {
      this.request = true;
    } else {
      this.request = false;
    }
  }

  constructor(private issueservice:IssueService,private route:ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.issueid$ = params.issueid);
    this.route.params.subscribe(params => this.assignedby$ = params.assignedby);
   }

   FixedissueAction(){
     
    if (!(this.issuetype_id)) {
      alert("Please enter issuetype");
      return;
    }

    if (!(this.status)) {
      alert("Please enter any Status");
      return;
    }
    if (!(this.startdate)) {
      alert("Please enter start date");
      return;
    }
    if (!(this.enddate)) {
      alert("Please enter any end date");
      return;
    }    
    if (!(this.newmessage)) {
      alert("Please enter any message");
      return;
    }

    this.issueservice
    .clientfixedissueAction(this.issuetype_id,this.status,this.convert_DT(this.startdate),this.convert_DT(this.enddate),this.newmessage,this.employeeid,this.issueid$)
    .subscribe((data: any[]) => {
      alert("Updated successfully!")
      this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewIssues'] } }]);
    });

   }

   issueAction(){

    if (!(this.issuetype_id)) {
      alert("Please enter issuetype");
      return;
    }

    if (!(this.status)) {
      alert("Please enter any Status");
      return;
    }
   
    if (!(this.newmessage)) {
      alert("Please enter any message");
      return;
    }

    this.issueservice
    .clientissueAction(this.issuetype_id,this.status,this.newmessage,this.employeeid,this.issueid$)
    .subscribe((data: any[]) => {
      alert("Updated successfully!")
      this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewIssues'] } }]);
    });

   }
  goBack() {
      this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewIssues'] } }]);
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
      this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewIssues'] } }]);
    });
  }

  changetoRequest(){
    this.issueservice
    .changetoRequest(this.issueid$,this.employeeid)
    .subscribe((data: any[]) => {
      alert("Changed Issue to Request successfully!")
      this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewIssues'] } }]);
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
    this.status="";
    this.issuetype_id="";

    this.issueservice
    .getIssueDetailsforEmp(this.issueid$,this.assignedby$)
    .subscribe((data: any[]) => {
      this.IssueDetailsforEmp = data[0];

      if(this.IssueDetailsforEmp.status_id=='1'||this.IssueDetailsforEmp.status_id=='2'){
        this.status="";
      }
      else{
        this.status=this.IssueDetailsforEmp.status_id;
      }
      
      if(this.IssueDetailsforEmp.assignedby=='2'){
          this.assignedbyflag=false;
      }
      else{
        this.assignedbyflag=false;
      }

      if(this.IssueDetailsforEmp.imagename!=null){
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
    .getIssueType()
    .subscribe((data: any[]) => {
      this.IssueType = data;
    });
  }

}
