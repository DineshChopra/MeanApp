import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,  } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  myForm : FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      email : new FormControl(null, [
        Validators.required,
        // Validators.pattern('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/')
        ]),
      password : new FormControl(null, Validators.required),

    });
  }
  onSubmit(){
    console.log(this.myForm);
    const formValue = this.myForm.value;
    const user = new User(formValue.email, formValue.password);
    this.authService.signin(user).subscribe(
      (data : Response) => {
        console.log('data --------', data)
        localStorage.setItem('token' , data['token']);
        localStorage.setItem('userId' , data['userId']);
        this.router.navigateByUrl('/');
      },
      (err : Response) => console.error(err)
    );
    this.myForm.reset();
  }

}
