import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunctions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // form ID
  signupForm: FormGroup;
  path: string;
  msgError: string;
  imagePreview: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.path = this.router.url;

    // creation form inputs by FormBuilder
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img: [""],
    })
  }
  //event
  signup() {
    console.log("here user object", this.signupForm.value);

    this.signupForm.value.role = (this.path == "/subscribe") ? "user" : "admin";

    this.userService.signup(this.signupForm.value, this.signupForm.value.img).subscribe(
      (response) => {
        console.log("here message", response.message);
        if (response.message == "Error") {
          this.msgError = "Email exist";
        } else {
          this.router.navigate(["signin"]);
        }

      }
    );


  }



  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    // code affichage img 
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

}
