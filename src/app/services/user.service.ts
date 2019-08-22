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
}
