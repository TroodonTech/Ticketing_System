import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-set-u-p',
  templateUrl: './set-u-p.component.html',
  styleUrls: ['./set-u-p.component.scss']
})

export class SetUPComponent implements OnInit {
  username;
  userroletype_id$: Object;
  password;
  managerMail: Object;
  userMail: Object;
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

  constructor(private route: ActivatedRoute, private UserService: UserService,
     private http: HttpClient, private router: Router) {
    this.route.params.subscribe(params => this.userroletype_id$ = params.userroletype_id);
   
  }

  setUsernamePassword() {
    if (!this.username) {
      alert("User Name can't be empty");
    } else {
      this.UserService.checkUserName(this.username, this.userroletype_id$, )
        .subscribe((data: any[]) => {
          if (data[0].result == 'Exists') {
            alert("User Name already exists");
          } else {
            this.UserService.setLoginCreds(this.username, this.password, this.userroletype_id$)
              .subscribe((data: any[]) => {
                
                this.router.navigate(['AdminDashboard', { outlets: { AdminOut: ['ViewUser'] } }]);
               

                  this.UserService.getUserEmail(this.username).subscribe((data:any[]) => {
                    this.managerMail = data[0].EmailID;
                    this.userMail = data[0].newmail;

                    if (this.userMail == null) {
                      alert("Login Credentials created for user Successfully! Mail not send , Mail-Id not found !");
                    } else {
                      var message = 'Your Username is ' + this.username + ' and ' + 'Your Password is ' + this.password + "                https://troowork.azurewebsites.net";
                      console.log(message);
                      const obj = {
                        from: this.managerMail,
                        to: this.userMail,
                        subject: 'Login Credentials',
                        text: message
                      };
                      const url = 'http://localhost:3000/sendmail';
                      return this.http.post(url, obj)
                        .subscribe(res => console.log('Mail Sent Successfully...'));
                    }
                  });
                
              });
          }
        });
    }
  }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.IsSupervisor = profile.IsSupervisor;
    this.name = profile.username;
    this.employeekey = profile.employeekey;
    this.OrganizationID = profile.OrganizationID;

    this.username = this.str$;
  }

}