import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
    selector : 'app-authentication',
    template : `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a [routerLink]="['signup']">Signup</a></li>
                    <li><a [routerLink]="['signin']" *ngIf="!isLoggedIn()">Signin</a></li>
                    <li><a [routerLink]="['logout']" *ngIf="isLoggedIn()">Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent implements OnInit{
    constructor(private authService : AuthService){

    }
    ngOnInit(){

    }
    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}