import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import{UserService} from '../../services/user.service';

@Component({
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.scss']
})
export class ViewprojectComponent implements OnInit {

  projectname;
  projectdesc;
  projectdetailstable;
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

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));

    
    this.UserService.getProjectDetailsview()
      .subscribe((data: any[]) => {
        this.projectdetailstable = data;
      });
  }

}

