import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  UserRoleType;
  employee_id$;
  employeeid;
  FirstName: String;
  LastName: String;
  MiddleName: String;
  Address: any;
  Phone: any;
  EmailID: any;
  employeedetails;
  RoleTypeList;

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

  constructor(public UserService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.employee_id$ = params.employee_id);
  }
  editEmployee() {

    this.UserService.Edituser(this.FirstName, this.LastName, this.MiddleName, this.Address,
       this.Phone, this.EmailID,this.UserRoleType ,this.employee_id$)
    .subscribe((data) => {
        this.employeedetails = data;
        alert(' Updated Successfully');
        this.router.navigate(['/AdminDashboard', { outlets: { AdminOut: ['ViewUser'] } }]);
      });
  }

  goBack() {
    this.router.navigate(['/AdminDashboard', { outlets: { AdminOut: ['ViewUser'] } }]);
  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.employeeid = profile.employeeid;
    //////////////////emp id of userlogin 


    // this.requestdetails.assignedname="";
    this.UserService
    .getuserroletypeadmin()
    .subscribe((data: any[]) => {
      debugger;
      this.RoleTypeList = data;
      console.log(data)
    });
    this.UserService.getEmpDetailsedit(this.employee_id$)
    .subscribe((data) => {
      debugger;
      this.employeedetails = data[0];
    });

  }

}

