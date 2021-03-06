import { Component, OnInit } from '@angular/core';
import { PtorequestService } from "../../services/ptorequest.service";
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-view-pto-request',
  templateUrl: './view-pto-request.component.html',
  styleUrls: ['./view-pto-request.component.scss']
})
export class ViewPtoRequestComponent implements OnInit {

     /////////////////////////////////Author:Aswathy///////////////

  role: String;
  name: String;
  username;
  employeeid;
  curr_date;
  startdate;
  enddate;
  assignment;
  comments;
  requestdetails;
  deleterequestKey;

  fromdate;
  todate;
  ptoStatus;

  vpto;
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
  viewpto(fromdate, todate, ptoStatus) {

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

      var pstatus;
      if (!ptoStatus) {
        pstatus = null;
      }
      else {
        pstatus = ptoStatus;
      }

      this.vpto = {
        fromdate: fdate,
        todate: tdate,
        ptoStatus: pstatus,
        employeekey: this.employeeid
      };

      this.PtorequestService.getPTORequestdetailsforManager(this.vpto)
        .subscribe((data) => {
          this.requestdetails = data;
        });
    }
  }


  constructor(private PtorequestService: PtorequestService) { }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

    this.fromdate = new Date(Date.now());
    this.todate = new Date(Date.now());
    this.ptoStatus = "";

    this.fromdate = this.convert_DT(this.fromdate);
    this.todate = this.convert_DT(this.todate);

    var pstatus = null;

    this.vpto = {
      fromdate: this.fromdate,
      todate: this.todate,
      ptoStatus: pstatus,
      employeekey: this.employeeid
    };

    this.PtorequestService.getPTORequestdetailsforManager(this.vpto)
      .subscribe((data) => {
        this.requestdetails = data;
      });

  }
}
