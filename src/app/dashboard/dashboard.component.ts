import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  user:any
  LoginDate:any


  DepositForm = this.fb.group({
    acno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ["", [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amnt: ["", [Validators.required, Validators.pattern('[0-9]*')]],

  })
  WithdrawForm = this.fb.group({
    acno: ["", [Validators.required, Validators.pattern('[0-9]*')]],
    pwd: ["", [Validators.required, Validators.pattern('[0-9a-zA-Z]*')]],
    amnt: ["", [Validators.required, Validators.pattern('[0-9]*')]],

  })


  constructor(private ds: DataService, private fb: FormBuilder,private router:Router) { 
    this.user=this.ds.currentUserName
    this.LoginDate=new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please log in.....")
      this.router.navigateByUrl("")
    }
  }
  deposit() {
    var acno = this.DepositForm.value.acno
    var pwd = this.DepositForm.value.pwd
    var amnt = this.DepositForm.value.amnt
    if (this.DepositForm.valid) {
      const result = this.ds.deposit(acno, pwd, amnt)
      if (result) {
        alert(amnt + "amount deposited successfully and new balance is;" + result)
      }

    }
    else {
      alert("invalid form")
    }
  }

  withdraw() {
    var acno = this.WithdrawForm.value.acno
    var pwd = this.WithdrawForm.value.pwd
    var amnt = this.WithdrawForm.value.amnt
    if (this.WithdrawForm.valid) {
      const result = this.ds.withdraw(acno, pwd, amnt)
      if (result) {
        alert(amnt + "debited successfully and new balance is;" + result)
      }

    }
    else {
      alert("invalid form")
    }
  }

logout(){
  localStorage.removeItem("currentUserName")
  localStorage.removeItem("currentAcno")
  this.router.navigateByUrl("")
}
}

