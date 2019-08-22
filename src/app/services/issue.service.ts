import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient) { }
  getIssueType(){
    return this.
      http.get('http://localhost:3000/getIssueType');
  }
  getpriority(){
    return this.
    http.get('http://localhost:3000/getpriority');
  }
  submitIssue(issuetype,descrip,priority){

    const url = 'http://localhost:3000/submitIssue';
    const obj = {
      issuetype: issuetype,
      descrip: descrip,
      priority: priority
    };

    return this.http.post(url, obj);
  }
  getHistory(employeeid){
    return this.
    http.get('http://localhost:3000/getHistory?employeeid=' +employeeid);
  }
  getHistoryDetails(issueid){
    return this.
    http.get('http://localhost:3000/getHistoryDetails?issueid=' +issueid);
  }
  getMessages(issueid){
    return this.
    http.get('http://localhost:3000/getMessages?issueid=' +issueid);
  }
  saveMessage(newmessage){
    return this.
    http.get('http://localhost:3000/getMessages?newmessage=' +newmessage);
  }
}