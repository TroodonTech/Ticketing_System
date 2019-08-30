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
  EmailID$;
  role;
  username;
  userroletype_id$: Object;
  password;
  managerMail;
  userMail;ct;
  employeeid;
  name;
  RoleList;
  userrolename;
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
   this.route.params.subscribe(params => this. EmailID$ = params. EmailID);
  }

  setUsernamePassword() {
    if (!this.userrolename) {
      alert("User Name can't be empty");
     } 
    // else {
    //   this.UserService.checkUserName(this.username, this.userroletype_id$, )
    //     .subscribe((data: any[]) => {
    //       if (data[0].result == 'Exists') {
    //         debugger;
    //         alert("User Name already exists");
    //       } 
    else {
            this.UserService.setLoginCreds(this.userrolename, this.password, this.userroletype_id$)
              .subscribe((data: any[]) => {
                debugger;
                if(this.employeeid==3){
                this.router.navigate(['ManagerDashBoard', { outlets: { ManagerOut: ['ViewUser'] } }]);
              }
        
              else{
                this.router.navigate(['AdminDashboard', { outlets: { AdminOut: ['ViewUser'] } }]);
              }
                   

                    if (!this.managerMail) {
                      alert("Login Credentials created for user Successfully! Mail not send , Mail-Id not found !");
                    } else {
                      var message = 'Your Username is ' + this.userrolename + ' and ' + 'Your Password is ' + this.password ;
                      console.log(message);
                      const obj = {
                        from: this.managerMail,
                        to: this.userMail,
                      
                        subject: 'Login Credentials',
                        text: message
                      };
                    debugger;
                      const url = 'http://localhost:3000/sendmail';
                      return this.http.post(url, obj)
                        .subscribe(res => console.log('Mail Sent Successfully...'));
                    }
                
                
              });
          }
        // });
    }
  // }

  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.userMail =  this.EmailID$;
  
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    // this.name = profile.name;

    // this.username = this.str$;
    this.UserService
    .getuserrole(this.userroletype_id$)
    .subscribe((data: any[]) => {
      debugger;
      this.RoleList = data[0];
      console.log(data);
    });
  }

}
