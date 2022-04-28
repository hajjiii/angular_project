import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUserName: any
  currentAcno:any

  database: any = {
    1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "Laisha", password: 1001, balance: 2000, transaction: [] },
    1002: { acno: 1002, uname: "Vyom", password: 1002, balance: 4000, transaction: [] }

  }



  constructor() {
    this.getDetails()
  }



saveDetails(){
  localStorage.setItem("database",JSON.stringify(this.database))
  if(this.currentAcno){
    localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  }
  if(this.currentUserName){
    localStorage.setItem("currentUserName",JSON.stringify(this.currentUserName))
  }
}

getDetails(){
  if(localStorage.getItem("database")){
    this.database=JSON.parse(localStorage.getItem("database")||"")
  }
  if(localStorage.getItem("currentAcno")){
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||"")
  }
  if(localStorage.getItem("currentUserName")){
    this.currentUserName=JSON.parse(localStorage.getItem("currentUserName")||"")
  }
}

  register(acno: any, password: any, uname: any) {

    let database = this.database

    if (acno in database) {
      // acno already exists
      return false
    }
    else {
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction: []

      }
      console.log(database);
      this.saveDetails()
      return true

    }
  }

  login(acno: any, pwd: any) {

    let database = this.database

    if (acno in database) {
      if (pwd == database[acno]["password"]) {
        this.currentUserName = database[acno]["uname"]
        this.currentAcno = acno
        this.saveDetails()
        return true

        // this.router.navigateByUrl("dashboard")
        // alert("login successfull")
      }
      else {
        alert("incorrect password")
        return false
      }

    }
    else {
      alert("account does not exist")
      return false
    }
  }


  deposit(acno: any, pwd: any, amnt: any) {
    var amount = parseInt(amnt)
    let database = this.database
    if (acno in database) {
      if (pwd == database[acno]["password"]) {
        database[acno]["balance"] += amount
        database[acno]["transaction"].push({
          type: "CREDIT",
          amount: amount
        })
        console.log(database)
        this.saveDetails()
        return database[acno]["balance"]

      }
      else {
        alert("Incorrect Password")
        return false

      }

    }
    else {
      alert("Account doesnot exist")
      return false

    }
  }


  withdraw(acno: any, pwd: any, amnt: any) {
    var amount = parseInt(amnt)
    let database = this.database

    if (acno in database) {
      if (pwd == database[acno]["password"]) {
        if (database[acno]["balance"] > amount) {
          database[acno]["balance"] -= amount
          database[acno]["transaction"].push({
            type: "DEBIT",
            amount: amount
          })
          console.log(database)
          this.saveDetails()
          return database[acno]["balance"]
        }
        else {
          alert("insufficient balance")
          return false

        }
      }
      else {
        alert("incorrect password")
        return false

      }

    }
    else {
      alert("Account doesnot exist!!!")
      return false
    }



  }

  getTransaction(acno:any){
    return this.database[acno]["transaction"]

  }
}
