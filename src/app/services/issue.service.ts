import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  ///////Author: Aswathy//////////////////////

  constructor(private http: HttpClient) { }

  public exportAsExcelFile(json: any[],excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet}, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName+ EXCEL_EXTENSION);
  }

  getIssueType(){
    return this.
      http.get('http://localhost:3000/getIssueType');
  }
  getpriority(){
    return this.
    http.get('http://localhost:3000/getpriority');
  }
  submitIssue(descrip,priority,employeeid,curr_date){

    const url = 'http://localhost:3000/submitIssue';
    const obj = {
      descrip: descrip,
      priority: priority,
      employeeid:employeeid,
      curr_date:curr_date
    };

    return this.http.post(url, obj);
  }
  getHistory(employeeid,pageno,items_perpage){
    return this.
    http.get('http://localhost:3000/getHistory?employeeid=' +employeeid+ '&pageno=' + pageno + '&items_perpage=' + items_perpage);
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
  getProductNames(){
    return this.
    http.get('http://localhost:3000/getProductNames');
  }

  submitIssuebyEmployee(issuetype,Description,priority,employeeid,Product,curr_date){
    const url = 'http://localhost:3000/submitIssuebyEmployee';
    const obj = {
      issuetype:issuetype,
      Description:Description,
      priority: priority,
      employeeid:employeeid,
      Product:Product,
      curr_date:curr_date
    };
    return this.http.post(url, obj);
  }

  getIssuesforEmp(employeeid,pageno,items_perpage){
    return this.
    http.get('http://localhost:3000/getIssuesforEmp?employeeid=' +employeeid+ '&pageno=' + pageno + '&items_perpage=' + items_perpage);
  }

  getIssueDetailsforEmp(issueid,assignedby){
    return this.
    http.get('http://localhost:3000/getIssueDetailsforEmp?issueid=' +issueid + '&assignedby=' + assignedby);
  }

  FixedissueAction(status,startdate,enddate,newmessage,employeeid,issueid){
    const url = 'http://localhost:3000/fixedissueAction';
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

  issueAction(status,newmessage,employeeid,issueid){
    const url = 'http://localhost:3000/issueAction';
    const obj = {
      status:status,
      newmessage: newmessage,
      employeeid: employeeid,
      issueid:issueid
    };

    return this.http.post(url, obj);
  }

  clientfixedissueAction(issuetype,status,startdate,enddate,newmessage,employeeid,issueid){
    const url = 'http://localhost:3000/clientfixedissueAction';
    const obj = {
      issuetype:issuetype,
      status:status,
      startdate:startdate,
      enddate:enddate,
      newmessage: newmessage,
      employeeid: employeeid,
      issueid:issueid
    };

    return this.http.post(url, obj);
  }

  clientissueAction(issuetype,status,newmessage,employeeid,issueid){
    const url = 'http://localhost:3000/clientissueAction';
    const obj = {
      issuetype:issuetype,
      status:status,
      newmessage: newmessage,
      employeeid: employeeid,
      issueid:issueid
    };

    return this.http.post(url, obj);
  }
  getIssueNumber(issueid,employeeid){
    return this.
    http.get('http://localhost:3000/getIssueNumber?issueid=' +issueid + '&employeeid=' + employeeid);
  }
  
  duplicateAction(issueid,duplicateissueid){
    return this.
    http.get('http://localhost:3000/duplicateAction?issueid=' +issueid + '&duplicateissueid=' +duplicateissueid);
  }
  getAllIssues(issue){
    const url ='http://localhost:3000/getAllIssues';
    return this
      .http
      .post(url,issue);
  }
  getStatus(){
    return this.
    http.get('http://localhost:3000/getStatus');
  }
  deleteIssues(deleteKey){
    return this.
    http.get('http://localhost:3000/deleteIssues?deleteKey=' +deleteKey);
  }
  getIssueDetailsforManager(issueid){
    return this.
    http.get('http://localhost:3000/getIssueDetailsforManager?issueid=' +issueid);
  }
  getIssuetype(){
    return this.
    http.get('http://localhost:3000/getIssuetype');
  }
  getAllEmployees(){
    return this.
    http.get('http://localhost:3000/getAllEmployees');
  }
  issueAssign(IssueTypeid,employee,employeeid,issueid){
    const url = 'http://localhost:3000/issueAssign';
    const obj = {
      IssueTypeid:IssueTypeid,
      employee:employee,
      employeeid: employeeid,
      issueid:issueid
    };
    return this.http.post(url, obj);
  }
  submitIssuebyManager(issuetype,employee,Description,priority,employeeid,Product,curr_date){
    const url = 'http://localhost:3000/submitIssuebyManager';
    const obj = {
      issuetype:issuetype,
      employee:employee,
      Description:Description,
      priority: priority,
      employeeid:employeeid,
      Product:Product,
      curr_date:curr_date
    };
    return this.http.post(url, obj);
  }
  searchResultOfIssue(value){
    return this.
    http.get('http://localhost:3000/searchResultOfIssue?value=' +value);
  }
  changetoRequest(issueid,employeeid){
    return this.
    http.get('http://localhost:3000/changetoRequest?issueid=' +issueid + '&employeeid=' + employeeid);
  }
  generateIssueReport(fromdate,todate){
    return this.
    http.get('http://localhost:3000/generateIssueReport?fromdate=' +fromdate + '&todate=' + todate);
  }
  getRecentIssue(employeeid){
    return this.
    http.get('http://localhost:3000/getRecentIssue?employeeid=' + employeeid);
  }
  getRecentIssueforClient(employeeid){
    return this.
    http.get('http://localhost:3000/getRecentIssueforClient?employeeid=' + employeeid);
  }
  getRecentRequest(employeeid){
    return this.
    http.get('http://localhost:3000/getRecentRequest?employeeid=' + employeeid);
  }
}