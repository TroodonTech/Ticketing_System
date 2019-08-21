import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username, password) {
    const url = 'http://localhost:3000/authenticate'
    const obj = {
      username: username,
      password: password
    };
    return this.http.post(url, obj);
  }
  //   login(username, password) {
  //   return this.
  //   http.get('http://localhost:3000/authenticate?username=' +username + '&password=' + password);
  // }
  // getEmpNameForWelcomeMessage(empid) {
  //   return this
  //     .http
  //     .get('http://localhost:3000/EmpNameForwelcomeMessage?empid=' + empid);
  // }

}
