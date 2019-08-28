import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

     /////////////////////////////////Author:Raima///////////////

  tokenobj;
  role: String;
  username: String;
  name:String;
  employeeid;
  product;
  productid;

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
  
  loginForm: FormGroup; 
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(username, password) {
    if (!username) {
      debugger;
      alert("Enter User Name");
    }
    else if (!password) {
      alert("Enter Password");
    } 
    else {
      this.loginService
        .login(username, password)
        .subscribe((data: any[]) => {
          this.tokenobj = data;
          localStorage.setItem('token', this.tokenobj.token);
          window.sessionStorage.token = this.tokenobj.token;
          window.localStorage['token'] = this.tokenobj.token;
            var encodedProfile = this.tokenobj.token.split('.')[1];
            var profile = JSON.parse(this.url_base64_decode(encodedProfile));
            this.role = profile.role;
            this.username = profile.username;
            this.employeeid = profile.employeeid;
            this.name = profile.name;
            console.log("login successfull");

            if (profile.role === 'Admin') {
              this.router.navigate(['/AdminDashboard',{ outlets: { AdminOut: ['welcomePage'] } }]); // redirect to superadmin
            }
            else if (profile.role === 'Client') {
              this.router.navigate(['/ClientDashboard',{ outlets: { ClientOut: ['welcomePage'] } }]);      // redirect to Admin
            }
            else if (profile.role === 'Manager') {
              this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['welcomePage'] } }]);  // redirect to Manager
            }
            else if (profile.role === 'Employee') {
              this.router.navigate(['/EmployeeDashboard', { outlets: { EmployeeOut: ['welcomePage'] } }]); // redirect to Employee
            }
        },
          res => {
            if (res.error.text === "Wrong user or password") {
              alert("Invalid login credentials. Please enter correct credentials to login...");
            }
          });
    }
  }

  ngOnInit() {
  }

}
