import { Component, OnInit } from '@angular/core';
import { PtorequestService } from '../../services/ptorequest.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-pto-request-details',
  templateUrl: './pto-request-details.component.html',
  styleUrls: ['./pto-request-details.component.scss']
})
export class PtoRequestDetailsComponent implements OnInit {

    /////////////////////////////////Author:Aswathy///////////////

  role: String;
  name: String;
  username;
  requestdetails;
  editflag;
  ptorequestID$;
  employeeid;

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

  constructor(public PtorequestService: PtorequestService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.ptorequestID$ = params.request_id);
  }

  goBack() {
    this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['ViewPtoRequest'] } }]);
  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;
    this.editflag = false;

    this.PtorequestService.getRequestInfoforEmployee(this.ptorequestID$).subscribe((data) => {
      this.requestdetails = data[0];
    });
  }
}
