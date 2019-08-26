import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  getuserroletype(){
    return this.
      http.get('http://localhost:3000/getuserroletype');
  }
  getuserroletypeadmin(){
    return this.
      http.get('http://localhost:3000/getuserroletype');
  }
  insertion(FirstName, LastName, MiddleName, Address, Phone, EmailID,UserRoleType){
    const url='http://localhost:3000/addemployee'
    const obj={
      FirstName:FirstName,
      LastName:LastName,
      MiddleName:MiddleName,
      Address:Address,
      Phone:Phone,
      EmailID:EmailID,
      UserRoleType:UserRoleType
    }
    return this
    .http.post(url,obj);
  }
  insert(ProjectName, Projectdesc){
    const url='http://localhost:3000/addproject'
    const obj={
      ProjectName:ProjectName,
      Projectdesc:Projectdesc,
      
    }
    return this
    .http.post(url,obj);
  }
  checkUserName(userName, userroletype_id) {
    return this
      .http
      .get('http://localhost:3000/checkUsername?username=' + userName + '&userroletype_id=' + userroletype_id);
  }
  setLoginCreds(username, password, userroletype_id) {
    const url = 'http://localhost:3000/setUsernamePassword';
    const obj = {
      username: username,
      password: password,
      userroletype_id: userroletype_id
    };
    return this.http.post(url, obj);
  }
  getEmpDetails(){
    return this.
    http.get('http://localhost:3000/getEmpDetails');
}

getProjectDetails(){
  return this.
  http.get('http://localhost:3000/getEmpDetails');
}
}
