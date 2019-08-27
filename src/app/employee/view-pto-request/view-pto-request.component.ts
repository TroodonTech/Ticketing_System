import { Component, OnInit } from '@angular/core';
import { PtorequestService } from '../../services/ptorequest.service';

@Component({
  selector: 'app-view-pto-request',
  templateUrl: './view-pto-request.component.html',
  styleUrls: ['./view-pto-request.component.scss']
})
export class ViewPtoRequestComponent implements OnInit {

     /////////////////////////////////Author:Aswathy///////////////

  role: String;
  name: String;
  username;
  employeeid;
  requestdetails;
  editflag;
  deleteRequestKey;

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

  constructor(private PtorequestService: PtorequestService) { }
  deletePass(key) {
    this.deleteRequestKey = key;

  }
  deleteRequest() {
    this.PtorequestService.deletePTORequest(this.deleteRequestKey)
      .subscribe((data) => {
        alert('PTO Request Deleted Successfully');
        this.PtorequestService.getRequestdetails(this.employeeid).subscribe((data) => {
          this.requestdetails = data;
        });
      });
  }
  ngOnInit() {

    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;

    this.PtorequestService.getRequestdetails(this.employeeid).subscribe((data) => {
      this.requestdetails = data;
    });
  }

}
