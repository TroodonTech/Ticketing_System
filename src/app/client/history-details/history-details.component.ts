import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { IssueService } from "../../services/issue.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit {


  /////////////////////////////////Author:Aswathy///////////////
  role;
  username;
  employeeid;
  name;
  issueid$;
  messages;
  newmessage;
  HistoryDetails;
  private readonly: boolean = true;
  imageflag=false;

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

  constructor(private fb: FormBuilder,private issueservice:IssueService,private route:ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.issueid$ = params.issueid);
   }

   saveMessage(){

    if (!(this.newmessage)) {
      alert("Please enter any message");
      return;
    }

    this.issueservice
    .saveMessage(this.newmessage,this.employeeid,this.issueid$)
    .subscribe((data: any[]) => {
      alert("Message sent successfully!")
      this.router.navigate(['/ClientDashboard', { outlets: { ClientOut: ['ViewIssues'] } }]);
    });

   }
   goBack() {
      this.router.navigate(['/ClientDashboard', { outlets: { ClientOut: ['ViewIssues'] } }]);
    }

  ngOnInit() {
    var token = localStorage.getItem('token');
    var encodedProfile = token.split('.')[1];
    var profile = JSON.parse(this.url_base64_decode(encodedProfile));
    this.role = profile.role;
    this.username = profile.username;
    this.employeeid = profile.employeeid;
    this.name = profile.name;


    this.issueservice
    .getHistoryDetails(this.issueid$)
    .subscribe((data: any[]) => {
      this.HistoryDetails = data[0];
      if(this.HistoryDetails.imagename!=null){
        this.imageflag=true;
      }
      else{
        this.imageflag=false;
      }
    });

    this.issueservice
    .getMessages(this.issueid$)
    .subscribe((data: any[]) => {
      this.messages = data;
      console.log(this.messages);
    });

  }

}
