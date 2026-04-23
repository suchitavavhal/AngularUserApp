import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import {user} from '../model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
allUsers: user[]=[];
id:string;
userData:any;
winnersUrl= 'https://userdb-a04cf-default-rtdb.firebaseio.com/winners';

  constructor(private http:HttpClient, private router:Router) { }

  dataSource1:any;
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

      let youngUsers:user[]=[];

      for(let i=0;i < this.allUsers.length; i++)
      {
        if(21 > this.allUsers[i].age){
                   
          youngUsers.push(this.allUsers[i]);
          
        }
      
      }
      console.log(youngUsers);
      this.dataSource1=new MatTableDataSource(youngUsers);
    })
  }
  displayColumns: string[]= ['userName', 'age', 'score', 'actions'];
  // dataSource = new MatTableDataSource(this.allUsers);

  AddToWinners(id:string, userName:string){
    
    if(window.confirm('Do you want to add ' + userName + ' to winners list?')==true)
    {
      this.id=id;
      for(let i=0;i<this.allUsers.length; i++)
      {
          if(this.id == this.allUsers[i].id)
          {
            
            this.userData=this.allUsers[i]; 
            console.log(this.userData);
          }
      }

      const appHeaders = new HttpHeaders({'UserTransferHeader':'AddUserToWinners'});
      this.http.post('https://userdb-a04cf-default-rtdb.firebaseio.com/winners.json',this.userData, {headers:appHeaders}).
      subscribe((res)=>{
        console.log(res);
        
      });
      window.alert('User added to winners list.');
      this.router.navigate(['/winners']);
    }
    else{
      window.alert('User not added to the userlist');
    }
  }
}

