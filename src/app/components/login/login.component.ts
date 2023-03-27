import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  errorMsg: string;
  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private userService: UserService
    ) {}

  ngOnInit() {
    // creation form inputs by FormBuilder
    this.loginForm=this.formBuilder.group({
      email:["" , [Validators.required, Validators.email]],
      pwd:["", [Validators.required]],
    })
  }

   //event
   login(){

    // user {email:....., pwd:.....}
    let user = this.loginForm.value;
    this.userService.login(user);

    
  //   let user=this.loginForm.value;
  //   console.log("here user  object", user);
  //   this.userService.login(user).subscribe(
  //     (responce)=>{
  //       console.log("here into responce",responce);
  //       if (responce.message=="2") {
  //         localStorage.setItem("connectedUserId", responce.user.id);
  //         if (responce.user.role=="admin") {
  //           this.router.navigate(["admin"]);
  //         } else {
  //           this.router.navigate([""]);
  //         }
          
  //       } else {
  //         this.errorMsg="please check Email/pwd";
          
  //       }
  //     }
  //   );

    
    
 }

}
