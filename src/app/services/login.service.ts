import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

     /////////////////////////////////Author:Raima///////////////

  login(username, password) {
    const url = 'http://localhost:3000/authenticate'
    const obj = {
      username: username,
      password: password
    };
    return this.http.post(url, obj);
  }
  

}
