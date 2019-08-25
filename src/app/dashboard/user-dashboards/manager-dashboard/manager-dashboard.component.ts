import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../services/login.service";

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {

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
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    // 
    
    // this.employeekey = profile.employeekey;
    // this.OrganizationID = profile.OrganizationID;

    // this.loginService
    //   .getEmpNameForWelcomeMessage(this.employeekey, this.OrganizationID)
    //   .subscribe((data: any[]) => {
    //     this.empName = data[0].EmpName;
    //   });
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

  }

}
