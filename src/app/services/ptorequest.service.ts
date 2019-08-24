import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PtorequestService {

  constructor(private http: HttpClient) { }

  submitRequest(curr_date, employeeid, startdate, enddate, comments, reason) {
    const url = 'http://localhost:3000/savePTORequest';
    const obj = {
      currentdate: curr_date,
      employeekey: employeeid,
      startdate: startdate,
      enddate: enddate,
      comments: comments,
      ptoreason: reason
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
  setEditedRequest(curr_date, ptorequestID$, StartDate, EndDate, Comments, reason, empKey) {
    const url = 'http://localhost:3000/setEditedRequest'
    const obj = {
      currdate: curr_date,
      ptorequestID: ptorequestID$,
      StartDate: StartDate,
      EndDate: EndDate,
      Comments: Comments,
      Reason: reason,
      EmpKey: empKey
    };
    return this.http.post(url, obj);
  }
  deletePTORequest(deleteRequestKey) {
    return this
      .http
      .get('http://localhost:3000/deletePTORequest?deleteRequestKey=' + deleteRequestKey);
  }

}
