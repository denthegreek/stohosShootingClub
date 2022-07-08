import { Injectable } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

const urlPart:string="http://192.168.1.53:8800/api/email";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(private http: HttpClient) { }

  postEmail(firstname:string, lastname:string, email:string, subject:string, body:string){
    var body="{\"firstname\":\""+firstname+"\",\"lastname\":\""+lastname+"\",\"email\":\""+email+"\",\"subject\":\""+btoa(subject).replace('"','\"')+"\",\"body\":\""+btoa(body).replace('"','\"')+"\"}";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlPart, true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          console.log("POST done");
      }
      else{
        console.log("Something went wrong!")
      }
    }
    xhr.send(body);
  }
}