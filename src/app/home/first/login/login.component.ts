import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  readonly _getUrl = '/user/logincheck/';
  // tslint:disable-next-line: variable-name
  readonly _gtUrl = '/user/viewbyemail/';


  constructor(private _http: HttpClient, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  value: any;
  vl: User;
  inp = false;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
    // console.log('ngonng');
  }

  onSubmitLogin(forms: NgForm) {
    if(forms.valid === true && this.email.valid === true){
    // this.value = this.email.value;
    console.log("hi there");
    const eml = this.email.value;
    this._http.get(this._getUrl + this.email.value + '/' + forms.value.password )
    .subscribe((data) =>{
      console.log("got it");
      if(data === 1) {
        this._http.get(this._gtUrl + eml)
        .subscribe((data2) =>{
          this.vl = data2 as any;
          localStorage.setItem('logged', this.vl[0].email);
          const pl = localStorage.getItem('logged');
          console.log(pl);
          this.router.navigate(['/homeuser']);


        });
      } else {

        this.value = 'User not registered' ;
        this.inp = true;

      }

       });

    }
  }



}
