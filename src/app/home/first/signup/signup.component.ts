import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  readonly _postUrl = '/user/add';
  // tslint:disable-next-line: variable-name
  readonly _getUrl = '/user/logincheck/';

  constructor(private _http: HttpClient) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  value: any;
  inp = false;
  users: User;
  // tslint:disable-next-line: variable-name
  _users: User;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  ngOnInit() {
  }

  onSubmitSignup(forms: NgForm) {
    if (forms.valid === true && this.email.valid === true){

      const eml = this.email.value;
      this._users = forms.value;
      this._users.email = eml;
      this._http.get(this._getUrl + this.email.value )
      .subscribe((data) => {
         this.value = data;
         if (this.value === 0) {
          const headers2 = new HttpHeaders({'Content-Type': 'application/json'});
          const options = {headers: headers2};
        // this.value = this.email.value;
        // console.log("hi there");
          this._http.post(this._postUrl , JSON.stringify(this._users), options )
          .subscribe((data2) =>{
             this.users = data2 as any;
             this.value = this.users.email;
           });
          this.inp = true;
          }

        });



    }
  }

}
