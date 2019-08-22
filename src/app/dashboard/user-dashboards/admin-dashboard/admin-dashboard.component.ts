import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/login.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  name: String;
  role: String;
  username: String;
  employeeid: Number;

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

  constructor(private loginService: LoginService) { }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile1 = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile1.role;
    this.username = profile1.username;
    this.employeeid = profile1.employeeid;
    this.name = profile1.name;
    console.log(profile1);
    // this.loginService
    //   .getEmpNameForWelcomeMessage(this.employeeid)
    //   .subscribe((data: any[]) => {
    //     // this.name = data[0].name;
    //   });
  }


}
