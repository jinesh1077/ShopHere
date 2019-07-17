import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/product';
import { Cart } from 'src/app/cart';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  // tslint:disable-next-line: variable-name
  readonly _getUrl = '/product/views';
  // tslint:disable-next-line: variable-name
  readonly _getimgUrl = '/product/viewimg/';
  // tslint:disable-next-line: variable-name
  readonly _getSubUrl = '/product/viewsub/';
  // tslint:disable-next-line: variable-name
  readonly _getCartEmailUrl = '/cart/viewbyemail/';

  items: Array<Product>;
  cartItems: Array<Cart>;
  imag: string;
  imgbl: any;
  panelOpenState = false;
  spinner = true;

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    const pl = localStorage.getItem('logged');

    this._http.get( this._getUrl)
    .subscribe((dat) =>{
      this.items = dat as any;
      console.log(this.items);

      this.items.forEach(ite => {

       const ab = btoa(ite.image.data.data.reduce(function (da, byte) {
        return da + String.fromCharCode(byte);
      }, ''));
       ite.image.contentType = 'data:image/jpg;base64,' + ab ;
      });
      this.spinner = false;
      this.items.forEach(ite=>{
        this._http.get( this._getCartEmailUrl + pl + '/' +ite._id)
      .subscribe((dat3) =>{
        ite.quantity = dat3 as any;
        if(ite.quantity==null){
          ite.quantity=0;
        }

      });

      });

    });






  }

  leftbtn(sr: string) {
    console.log(sr);
    const pl = localStorage.getItem('logged');
    this.items = null;
    this.spinner = true;
    this._http.get( this._getSubUrl + sr)
    .subscribe((dat) =>{
      this.items = dat as any;
      console.log(this.items);

      this.items.forEach(ite => {

       const ab = btoa(ite.image.data.data.reduce(function (da, byte) {
        return da + String.fromCharCode(byte);
      }, ''));
       ite.image.contentType = 'data:image/jpg;base64,' + ab ;
      });
      this.spinner = false;

      this.items.forEach(ite=>{
        this._http.get( this._getCartEmailUrl + pl + '/' +ite._id)
      .subscribe((dat3) =>{
        ite.quantity = dat3 as any;
        if(ite.quantity==null){
          ite.quantity=0;
        }

      });

      });

    });
  }



    // const base64String = btoa(String.fromCharCode.apply(null, this.items[0].image.data.data));
    // console.log(ite.image.data);


}
