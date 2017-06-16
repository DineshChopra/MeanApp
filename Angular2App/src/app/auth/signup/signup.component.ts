import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService : AuthService) { }
  myForm : FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      firstName : new FormControl(null, Validators.required),
      lastName : new FormControl(null, Validators.required),
      email : new FormControl(null, [
        Validators.required,
        // Validators.pattern('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/')
        ]),
      password : new FormControl(null, Validators.required),

    });
  }
  onSubmit(){
    console.log(this.myForm);
    const obj = this.myForm.value;
    const user  = new User(obj.email, obj.password, obj.firstName, obj.lastName);
    this.authService.signup(this.myForm.value)
        .subscribe(
          (response : Response) => {console.log('response', response);},
          (err : Response) => {console.error(err);}
        );
    this.myForm.reset();
  }

}
