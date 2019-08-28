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
      http.get('http://localhost:3000/getuserroletypeadmin');
  }
  getuserrole(userroletype_id){
    return this.
      http.get('http://localhost:3000/getuserrole?userroletype_id='+userroletype_id);
  }
  insertion(FirstName, LastName, MiddleName, Address, Phone, EmailID,UserRoleType,pvalue){
    const url='http://localhost:3000/addemployee'
    const obj={
      FirstName:FirstName,
      LastName:LastName,
      MiddleName:MiddleName,
      Address:Address,
      Phone:Phone,
      EmailID:EmailID,
      UserRoleType:UserRoleType,
      pvalue:pvalue
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
  getEmpDetails(employeeid){
    return this.
    http.get('http://localhost:3000/getEmpDetails?employeeid=' + employeeid);
}
getEmpDetailsedit(employeeid){
  return this.
  http.get('http://localhost:3000/getEmpDetailsedit?employeeid=' + employeeid);
}

getProjectDetails(){
  return this.
  http.get('http://localhost:3000/getProjectDetails');
}
deleteUser(deleteRequestKey) {
  return this
    .http
    .get('http://localhost:3000/deleteuser?deleteRequestKey=' + deleteRequestKey);
}
Edituser(FirstName, LastName,MiddleName, Address, Phone, EmailID,UserRoleType ,employee_id$) {
  const url = 'http://localhost:3000/Edituser'
  const obj = {
    FirstName: FirstName,
    LastName: LastName,
    MiddleName: MiddleName,
    Address: Address,
    Phone: Phone,
    EmailID: EmailID,
    UserRoleType: UserRoleType,
    employee_id: employee_id$
  };
  return this.http.post(url, obj);
}
getrequest() {
  return this
    .http
    .get('http://localhost:3000/getrequest' );
}
}
