import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //  string interpolation
  aim="Your Perfect Banking Partner"

  // property binding
   accnum="Account Number Please"


  acno=""
  pwd=""

  loginForm=this.fb.group({
    acno:["",[Validators.required,Validators.pattern('[0-9]*')]],
    pwd:["",[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  // database

  // database:any={
  //   1000:{acno:1000,uname:"Neer",password:1000,balance:5000},
  //   1001:{acno:1001,uname:"Laisha",password:1001,balance:2000},
  //   1002:{acno:1002,uname:"Vyom",password:1002,balance:4000}

  // }

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  // event binding using $event
  acnoChange(event:any){
    this.acno = event.target.value
  }
  pwdChange(event:any){
    this.pwd = event.target.value
  }

  // event binding
  login(){
    console.log(this.loginForm);
    var acno = this.loginForm.value.acno
    var pwd = this.loginForm.value.pwd

   if (this.loginForm.valid){
    const result=this.ds.login(acno,pwd)

    if (result){
      alert("Log In successful")
      this.router.navigateByUrl("dashboard")
    }

   }
   else{
     alert("invalid form")
   }

    // let database = this.database

    // if(acno in database){
    //   if(pwd == database[acno]["password"]){
    //     this.router.navigateByUrl("dashboard")
    //     alert("login successfull")
    //   }
    //   else{
    //     alert("incorrect password")
    //   }

    // }
    // else{
    //   alert("account does not exist")
    // }
  }


  //template referce variable 
  // login(a:any,p:any){
  //   var acno = a.value
  //   console.log(acno)
  //   var pwd = p.value
  //   console.log(pwd)

  //   let database = this.database

  //   if(acno in database){
  //     if(pwd == database[acno]["password"]){
  //       alert("login successfull")
  //     }
  //     else{
  //       alert("incoorect password")
  //     }

  //   }
  //   else{
  //     alert("account does not exist")
  //   }
  // }
}
