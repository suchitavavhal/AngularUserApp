import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onUserCreate(users: {name:string, age:string, score:string}, login:NgForm){
    const myHeaders = new HttpHeaders({'newUserHeader':'AddUser'});
    console.log(users);
    this.http.post('https://userdb-a04cf-default-rtdb.firebaseio.com/users.json',users, {headers:myHeaders}).
    subscribe((res)=>{
      console.log(res);
      
    });
    login.reset();
  }

}
