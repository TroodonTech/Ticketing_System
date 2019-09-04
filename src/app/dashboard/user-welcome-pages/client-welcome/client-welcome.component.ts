import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-client-welcome',
  templateUrl: './client-welcome.component.html',
  styleUrls: ['./client-welcome.component.scss']
})
export class ClientWelcomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  reportissue(){
    this.router.navigate(['ClientDashboard', { outlets: { ClientOut: ['ReportIssue'] } }]);}
  ngOnInit() {
  }

}
