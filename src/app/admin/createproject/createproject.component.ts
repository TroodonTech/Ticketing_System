import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import{UserService} from '../../services/user.service';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent {
  ProjectName;
  Projectdesc;

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

  createProject(){
    debugger;
    this.UserService.insert(this.ProjectName, this.Projectdesc)
    .subscribe((data: any[]) => {
      debugger;
      alert("Successfull");
     
     
      // this.router.navigate(['/AdminDashBoard', { outlets: { AdminOut: ['CreateProject'] } }]);
      // this.router.navigate(['ManagerDashboard', { outlets: { ManagerOut: ['SetUP'] } }]);
    });
  }
  

}
