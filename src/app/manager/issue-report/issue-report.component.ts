import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssueService } from "../../services/issue.service";
import { DatepickerOptions } from 'ng2-datepicker';

import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.scss']
})
export class IssueReportComponent implements OnInit {

  role;
  name;
  username;
  employeeid;
  fromdate;
  todate;
  viewIssueReport;

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


  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  public date: Date = new Date(Date.now());
 
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
    addStyle: {'font-size':'18px','width':'100%', 'border': '1px solid #ced4da','border-radius': '0.25rem'}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  
  public workexcel: Array<any> = [{
    WorkorderTypeName: '', DateandTime: '', Status: '', Employee: '', Room: '', Equipment: '', CheckinTime: '', CheckoutTime: '', Duration: '', DelayTime: '', Notes: ''
  }];

  constructor(private fb: FormBuilder, private IssueService: IssueService) { }

  generateIssueReport(from_date, to_date) {
    if ((to_date) && (this.convert_DT(from_date) >this.convert_DT( to_date))) {
      alert("Please check your Start Date!");
      return;
    }

    this.IssueService
    .generateIssueReport(this.convert_DT(from_date), this.convert_DT( to_date))
    .subscribe((data: any[]) => {
      this.viewIssueReport = data;
    });
  }

  exportToExcel(): void {

    for (var i = 0; i < this.viewIssueReport.length; i++) {
      this.workexcel.splice(i, 1);
      var ticketnumber = (this.viewIssueReport[i].ticketnumber);
      var issuetype = (this.viewIssueReport[i].issuetype);
      var description = (this.viewIssueReport[i].description);
      var status = (this.viewIssueReport[i].status);
      var projectname = (this.viewIssueReport[i].projectname);
      var assignedname = (this.viewIssueReport[i].assignedname);
      var fixstartDT = (this.viewIssueReport[i].fixstartDT);
      var fixendDT = (this.viewIssueReport[i].fixendDT);

      if (this.viewIssueReport[i]) {
        this.workexcel.push({
          'Reference Number': ticketnumber, 'Issue Type': issuetype, 'Description': description, 'Status': status, 'Project Name': projectname, 'Assigned Name': assignedname, 'Fix Start Date': fixstartDT, 'Fix End Date': fixendDT
        })
      }
    }
    var blob = new Blob([document.getElementById('exportable1').innerHTML], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(blob, "Issue_Report.xls");
  }

  ngOnInit() {

    this.fromdate = new Date();

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

  }
}

