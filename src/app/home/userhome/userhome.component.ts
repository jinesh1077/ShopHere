import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    if (localStorage.getItem('logged') == null) {
      this.router.navigate(['/']);
    } else {
      console.log(localStorage.getItem('logged'));

    }
  }

  home() {
    this.router.navigate(['/']);
  }

  profile() {
    this.router.navigate(['/homeuser']);
  }

  cart() {
    this.router.navigate(['/homeuser']);
  }

  logout() {
    localStorage.removeItem('logged');
    this.router.navigate(['/']);
  }

}
