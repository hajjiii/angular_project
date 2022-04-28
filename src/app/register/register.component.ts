import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname = ""
  acno = ""
  pwd = ""

  RegisterForm = this.fb.group({
    uname: ["",[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno: ["",[Validators.required,Validators.pattern('[0-9]*')]],
    pwd: ["",[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],

  })

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  register() {
    console.log(this.RegisterForm);
    // var acno = this.acno
    var acno = this.RegisterForm.value.acno
    var pwd = this.RegisterForm.value.pwd
    var uname = this.RegisterForm.value.uname
    // call register in dataservice
    if (this.RegisterForm.valid) {
      const result = this.ds.register(acno, pwd, uname)
      if (result) {
        alert("Register Successfully")
        this.router.navigateByUrl("")

      }
      else {
        alert("Account already exists..please LogIn")
      }


    }
    else {
      alert("invalid form")
    }

  }

}
