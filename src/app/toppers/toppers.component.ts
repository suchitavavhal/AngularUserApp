import { Component, OnInit } from '@angular/core';


import {MatTableDataSource} from '@angular/material/table';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import {user} from '../model/user';

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {

  allUsers: user[]=[];
  dataSource:any;
  toppers:any;
  minScore= 90;
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    this.http.get<user>('https://userdb-a04cf-default-rtdb.firebaseio.com/users.json')
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
       let toppers:user[]=[];
      for(let i=0;i < this.allUsers.length; i++)
      {
        if(this.minScore < this.allUsers[i].score){
                   
          toppers.push(this.allUsers[i]);
          
        }
      
      }
      console.log(toppers);
      this.dataSource=new MatTableDataSource(toppers);
    })
  }

  displayColumns: string[]= ['userName', 'age', 'score'];


}
