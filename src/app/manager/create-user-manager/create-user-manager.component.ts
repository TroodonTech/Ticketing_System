import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import{UserService} from '../../services/user.service'

@Component({
  selector: 'app-create-user-manager',
  templateUrl: './create-user-manager.component.html',
  styleUrls: ['./create-user-manager.component.scss']
})
export class CreateUserManagerComponent implements OnInit {
 
  UserRoleType;
  FirstName: String;
  LastName: String;
  MiddleName: String;
  Address: any;
  Phone: any;
  EmailID: any;
  roleTypeKey = 0;
  role: String;
  name: String;
  RoleTypeList;
  employeeid;
  username;
  checkclient;
  projectList;
  project_id;

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

  

  constructor(private route: ActivatedRoute, private UserService: UserService, private router: Router) { }

  createEmployee() {
    
    if (!(this.UserRoleType)) {
      alert("User Role Type is not provided !");
      return;
    }
    if(this.UserRoleType=='2')
    {
      if(!(this.project_id)){ 
        alert("Project is not provided !");
       return;
      }};
  
    if (!(this.FirstName )|| !this.FirstName.trim()) {
      alert("First Name is not provided !");
      return;
    }
    if (!(this.LastName) || !this.LastName.trim()) {
      alert("Last Name is not provided !");
      return;
    }
    if (!(this.Address) || !this.Address.trim()) {
      alert("Address is not provided !");
      return;
    }
  
    if (!(this.Phone) || !this.Phone.trim()) {
      alert(" PhoneNo is not provided !");
      return;
    }
    if (!(this.EmailID) || !this.EmailID.trim()) {
      alert("Email is not provided !");
      return;
    }
    if (this.project_id== null)
    {var pvalue=1}
    else{pvalue==this.project_id}

    this.UserService.insertion(this.FirstName, this.LastName, this.MiddleName, this.Address, this.Phone, this.EmailID,this.UserRoleType,pvalue)
    .subscribe((data: any[]) => {
      alert("User Created Successfully");
      var EmailID= this.EmailID;
      var userroletype_id=this.UserRoleType
      this.router.navigate(['/ManagerDashBoard', { outlets: { ManagerOut: ['SetUP',userroletype_id,EmailID] } }]);
      // this.router.navigate(['ManagerDashboard', { outlets: { ManagerOut: ['SetUP'] } }]);
    });
  }
  checkforclient(){
   
    if(this.UserRoleType=='2'){
      this.checkclient=true;

    }
    else{this.checkclient=false}
  }
  ngOnInit() {

    this.UserRoleType="";
    this.checkclient=false;

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

    this.UserService
    .getuserroletype()
    .subscribe((data: any[]) => {
      this.RoleTypeList = data;
      console.log(data);
    });
    this.UserService
    .getProjectDetails()
    .subscribe((data: any[]) => {
      this.projectList = data;
      console.log(data);
    });
  }
  numberValid(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  charValidation(event: any) {
    const patternChar = /[a-zA-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !patternChar.test(inputChar)) {
      event.preventDefault();
    }
  }

}
