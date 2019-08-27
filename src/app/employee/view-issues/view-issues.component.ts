import { Component, OnInit } from '@angular/core';
import { IssueService } from "../../services/issue.service";
import { DatepickerOptions } from 'ng2-datepicker';
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-view-issues',
  templateUrl: './view-issues.component.html',
  styleUrls: ['./view-issues.component.scss']
})
export class ViewIssuesComponent implements OnInit {

  searchform: FormGroup;
  role: String;
  name: String;
  username;
  employeeid;
  issuedetails;
  checkflag;
  checkValue = [];
  DuplicateValues = [];
  marked = false;
  showHide1: boolean;
  showHide2: boolean;
  pagination;
  pageno= 1;
  items_perpage = 20;

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

  public convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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
  constructor(private IssueService: IssueService,private router: Router,private formBuilder: FormBuilder) { }

  // toggleVisibility(e) {
  //   if (e.target.checked) {
  //     this.marked = true;
  //   } else {
  //     this.marked = false;
  //   }
  // }

  // Duplicate() {

  //   var DuplicateList = [];
  //   var DuplicateString;

  //   if (this.checkValue.length > 0) {
  //     for (var j = 0; j < this.checkValue.length; j++) {
  //       if (this.checkValue[j] === true)
  //       DuplicateList.push(this.DuplicateValues[j]);
  //     }
  //     DuplicateString = DuplicateList.join(',');
  //   }
  //   this.IssueService.DuplicateIssues(DuplicateString)
  //   .subscribe((data: any[]) => {
  //     alert('Duplicated Issues Successfully')
  //   });
  //   // this.checkvaluetag="workorderrequest"
  //   // this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['QrCodeViewList', DuplicateString] } }]);
  // }

  // checkBoxValueForDuplicate(index, DuplicateCheckValue, issue_id) {
  //   this.checkValue[index] = DuplicateCheckValue;
  //   this.DuplicateValues[index] = issue_id;
  //   for(var i=0;i<this.checkValue.length;)
  //   {
  //       if(this.checkValue[i]==true)
  //       {
  //         this.checkflag=true;
  //         return;
  //       }
  //       else
  //       {
  //         if(i==(this.checkValue.length-1))
  //         {
  //           this.checkValue=[];
  //           this.checkflag=false;
  //           return;
  //         }
  //         i++;
  //       }
  //     }
  // }

  previousPage() {

    this.pageno = +this.pageno - 1;
    this.IssueService
      .getIssuesforEmp(this.employeeid, this.pageno, this.items_perpage)
      .subscribe((data: any[]) => {
        this.issuedetails = data;
        for (var i = 0; i < this.issuedetails.length; i++) {
          this.issuedetails[i].CheckValue = false;
        }
        if (this.pageno == 1) {
          this.showHide2 = true;
          this.showHide1 = false;
        } else {
          this.showHide2 = true;
          this.showHide1 = true;
        }
      });
  }

  nextPage() {

    this.pageno = +this.pageno + 1;
    this.IssueService
      .getIssuesforEmp(this.employeeid, this.pageno, this.items_perpage)
      .subscribe((data: any[]) => {
        this.issuedetails = data;
        for (var i = 0; i < this.issuedetails.length; i++) {
          this.issuedetails[i].CheckValue = false;
        }
        this.pagination = +this.issuedetails[0].totalItems / (+this.pageno * (+this.items_perpage));
        if (this.pagination > 1) {
          this.showHide2 = true;
          this.showHide1 = true;
        }
        else {
          this.showHide2 = false;
          this.showHide1 = true;
        }
      });
  }


  searchDetails(SearchValue) {
    var value = SearchValue.trim();
      this.IssueService
        .searchResultOfIssue(value).subscribe((data: any[]) => {
          this.issuedetails = data;
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

    this.checkflag=false;

    this.IssueService.getIssuesforEmp(this.employeeid, this.pageno, this.items_perpage)
      .subscribe((data: any[]) => {
        this.issuedetails = data;
      });

    this.searchform = this.formBuilder.group({
      SearchDetails: ['', Validators.required]
    });
  }

}
