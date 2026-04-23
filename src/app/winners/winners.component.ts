import { Component, OnInit } from '@angular/core';


import {MatTableDataSource} from '@angular/material/table';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import {user} from '../model/user';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {
  allUsers: user[]=[];
  dataSource:any;
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    this.http.get<user>('https://userdb-a04cf-default-rtdb.firebaseio.com/winners.json')
    .pipe(map((res)=>{
      const users= [];
      for(const key in res){
        if(res.hasOwnProperty(key)){
          users.push({...res[key],id:key })
        }
      }
      return users;
    }))
    .subscribe((users)=>{
      console.log(users);
      this.allUsers = users;
      console.log(this.allUsers);
      this.dataSource=new MatTableDataSource(this.allUsers);
    })
  }

  displayColumns: string[]= ['userName', 'age', 'score'];

}
