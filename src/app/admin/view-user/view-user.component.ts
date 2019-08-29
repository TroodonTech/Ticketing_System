import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import{UserService} from '../../services/user.service'

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userrolename;
  firstname;
  lastname;
  phonenumber;
  address;
  mailID;
  employeedetailstable;
  employee_id;
  employeeid;
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

  constructor(private route: ActivatedRoute, private UserService: UserService, private router: Router) {}
  edit(key){
    this.employee_id = key;
    this.router.navigate(['/AdminDashboard', { outlets: { AdminOut: ['EditUser',this.employee_id] } }]);}
    deletePass(key) {
      debugger;
      this.employee_id = key;
  }
  

  
  deleteRequest() {
    debugger
    this.UserService.deleteUser(this.employee_id)
      .subscribe((data) => {
        alert('Deleted Successfully');
        this.UserService.getEmpDetails(this.employeeid)
      .subscribe((data: any[]) => {
        this.employeedetailstable = data;
      });
      });
  }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.userrolename = profile.userrolename;
    this.firstname = profile.firstname;
    this.lastname = profile.lastname;
    this.phonenumber = profile.phonenumber;
    this.address = profile.address;
    this.mailID = profile.mailID;
    this.employeeid = profile.employeeid;
    this.UserService.getEmpDetails(this.employeeid)
      .subscribe((data: any[]) => {
        this.employeedetailstable = data;
      });
  }

}

