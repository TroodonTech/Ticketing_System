import { Component, OnInit } from '@angular/core';
import { PtorequestService } from "../../services/ptorequest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-pto-request-action',
  templateUrl: './pto-request-action.component.html',
  styleUrls: ['./pto-request-action.component.scss']
})
export class PtoRequestActionComponent implements OnInit {

     /////////////////////////////////Author:Aswathy///////////////

  role: String;
  name: String;
  username;
  employeeid;
  approvedstartdate;
  approvedenddate;
  requestdetailsbyID;
  ptorequestDetails$;
  statuscurrentdate;
  assignmentdetails;
  assignmentdetails1;
  StatusKey;
  statuscomments;
  requestdetails;
  editflag;
  Status: String;
  details;

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
    // barTitleIfEmpty: 'Click to select a date',
    // placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'background-color':'white','border': '1px solid white', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  options1: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'MM/DD/YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    //locale: frLocale,
    //minDate: new Date(Date.now()), // Minimal selectable date
    //maxDate: new Date(Date.now()),  // Maximal selectable date
    // barTitleIfEmpty: 'Click to select a date',
    // placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: { 'font-size': '18px', 'width': '75%', 'background-color':'white','border': '1px solid white', 'border-radius': '0.25rem' }, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  convert_DT(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(- 2),
      day = ("0" + date.getDate()).slice(- 2);
    return [date.getFullYear(), mnth, day].join("-");
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

  charValidation(event: any) {
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
  }

  goBack() {
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewPtoRequest'] } }]);
  }

  constructor(private PtorequestService: PtorequestService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.ptorequestDetails$ = params.ptorequest_id);
  }

  saveRequestAction() {

    if (!(this.requestdetailsbyID.Status)) {
      alert('Status is not provided !');
      return;
    }

    if (this.requestdetailsbyID.Status === "Approved") {

     
      if (!(this.requestdetailsbyID.ApprovedStartDate)) {
        alert('Approved Start Date is not provided !');
        return;
      }

      if (!(this.requestdetailsbyID.ApprovedEndDate)) {
        alert('Approved End Date is not provided !');
        return;
      }

      // if (this.convert_DT(this.requestdetailsbyID.ApprovedStartDate) < this.statuscurrentdate) {
      //   alert("Approved start date can't be less than Today!");
      //   return;
      // }

      if ((this.convert_DT(this.requestdetailsbyID.ApprovedStartDate) < this.convert_DT(this.requestdetailsbyID.StartDate)) || (this.convert_DT(this.requestdetailsbyID.ApprovedStartDate) > this.convert_DT(this.requestdetailsbyID.EndDate))) {
        alert("Approved start date must be between requested dates!");
        return;
      }
      if ((this.convert_DT(this.requestdetailsbyID.ApprovedEndDate) < this.convert_DT(this.requestdetailsbyID.StartDate)) || (this.convert_DT(this.requestdetailsbyID.ApprovedEndDate) > this.convert_DT(this.requestdetailsbyID.EndDate))) {
        alert("Approved end date must be between requested dates!");
        return;
      }
    }




    var comments = this.requestdetailsbyID.StatusComment
    this.PtorequestService.saveRequestAction(this.ptorequestDetails$, this.employeeid,
      this.statuscurrentdate, this.convert_DT(this.requestdetailsbyID.ApprovedStartDate), this.convert_DT(this.requestdetailsbyID.ApprovedEndDate),
      this.requestdetailsbyID.Status, comments)
      .subscribe((data: any[]) => {
        this.details = data[0];
        alert("Request updated Successfully");

        this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['ViewPtoRequest'] } }]);

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

    this.statuscurrentdate = this.convert_DT(new Date());
    this.editflag = false;

    this.PtorequestService.getRequestdetailsbyID(this.ptorequestDetails$)
      .subscribe((data) => {
        this.requestdetailsbyID = data[0];
        this.requestdetailsbyID.Status = '';
      });
  }

}
