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
  submitIssue(descrip,priority,employeeid,filename1){

    const url = 'http://localhost:3000/submitIssue';
    const obj = {
      descrip: descrip,
      priority: priority,
      employeeid:employeeid,
      filename1:filename1
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
  saveMessage(newmessage,employeeid,issueid){
    const url = 'http://localhost:3000/saveMessage';
    const obj = {
      newmessage: newmessage,
      employeeid: employeeid,
      issueid:issueid
    };

    return this.http.post(url, obj);
  }
  getIssuesforEmp(employeeid){
    return this.
    http.get('http://localhost:3000/getIssuesforEmp?employeeid=' +employeeid);
  }

  getIssueDetailsforEmp(issueid,assignedby){
    return this.
    http.get('http://localhost:3000/getIssueDetailsforEmp?issueid=' +issueid + '&assignedby=' + assignedby);
  }

  issueAction(status,startdate,enddate,newmessage,employeeid,issueid){
    const url = 'http://localhost:3000/issueAction';
    const obj = {
      status:status,
      startdate:startdate,
      enddate:enddate,
      newmessage: newmessage,
      employeeid: employeeid,
      issueid:issueid
    };

    return this.http.post(url, obj);
  }
  
  DuplicateIssues(DuplicateString){
    return this.
    http.get('http://localhost:3000/DuplicateIssues?DuplicateString=' +DuplicateString);
  }
}