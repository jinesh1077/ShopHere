import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './home/first/first.component';
import { SignupComponent } from './home/first/signup/signup.component';
import { LoginComponent } from './home/first/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'


import { MatInputModule, MatCardModule, MatTableModule, MatOptionModule, MatGridListModule,
  MatButtonModule, MatToolbarModule, MatFormFieldModule, MatIconModule, MatTreeModule,
  MatExpansionModule, MatTabsModule, MatProgressSpinnerModule } from '@angular/material';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { UserhomeComponent } from './home/userhome/userhome.component';
import { DisplayComponent } from './home/userhome/display/display.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SignupComponent,
    LoginComponent,
    UserhomeComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatOptionModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
