import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PtorequestService {

  constructor(private http: HttpClient) { }

     /////////////////////////////////Author:Aswathy///////////////

  submitRequest(curr_date, employeeid, startdate, enddate, comments, assigningto) {
    const url = 'http://localhost:3000/savePTORequest';
    const obj = {
      currentdate: curr_date,
      employeekey: employeeid,
      startdate: startdate,
      enddate: enddate,
      comments: comments,
      ptoassigningto: assigningto
    };
    return this.http.post(url, obj);
  }
  getRequestdetails(employeekey) {
    return this
      .http
      .get('http://localhost:3000/getRequestDetails?employeekey=' + employeekey);
  }
  getRequestInfoforEmployee(ptorequestID) {
    return this
      .http
      .get('http://localhost:3000/getRequestDetailsforEmployee?ptorequestID=' + ptorequestID);
  }
  setEditedRequest(curr_date, ptorequestID$, StartDate, EndDate, Comments, assigningto, empKey) {
    const url = 'http://localhost:3000/setEditedRequest'
    const obj = {
      currdate: curr_date,
      ptorequestID: ptorequestID$,
      StartDate: StartDate,
      EndDate: EndDate,
      Comments: Comments,
      assigningto: assigningto,
      EmpKey: empKey
    };
    return this.http.post(url, obj);
  }
  deletePTORequest(deleteRequestKey) {
    return this
      .http
      .get('http://localhost:3000/deletePTORequest?deleteRequestKey=' + deleteRequestKey);
  }
  getEmployeesName(employeeid){
    return this
    .http
    .get('http://localhost:3000/getEmployeesName?employeeid=' + employeeid);
  }
  getPTORequestdetailsforManager(vpto) {
    const url ='http://localhost:3000/getPtoRequestdetailsforManager';
    return this
      .http
      .post(url,vpto);
  }
  getRequestdetailsbyID(ptorequestDetails$) {
    return this
      .http
      .get('http://localhost:3000/getRequestDetailsbyID?ptorequestDetailskey=' + ptorequestDetails$);
  }
  saveRequestAction(ptorequestDetails$, employeeid, statuscurrentdate, approvedstartdate, ApprovedEndDate, StatusKey, statuscomments) {
    const url = "http://localhost:3000/savePTORequestAction";
    const obj = {
      ptorequestDetails: ptorequestDetails$,
      employeekey: employeeid,
      statuscurrentdate: statuscurrentdate,
      approvedstartdate: approvedstartdate,
      ApprovedEndDate: ApprovedEndDate,
      StatusKey: StatusKey,
      statuscomments: statuscomments
    };
    return this.http.post(url, obj);
  }

}
