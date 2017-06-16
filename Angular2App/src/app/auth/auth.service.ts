import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

import { ErrorService } from '../error/error.service';

@Injectable()
export class AuthService {
  constructor(private http : Http, private errorService : ErrorService) { }
  private USER_URL = 'http://localhost:3010/api/user';
  signup(user : User) : Observable<any>{
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.USER_URL, body, {headers : headers})
                .map((response : Response) => {
                    return response.json();
                  }
                  )
                .catch((error : any) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                  });
  }

  signin(user : User) : Observable<any>{
    const body = JSON.stringify(user);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const URL = this.USER_URL + '/signin';
    return this.http.post(URL, body, {headers : headers})
                .map((response : Response) => {
                    return response.json();
                  }
                  )
                .catch((error : any) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
                  });
  }
  logout(){
    localStorage.clear();
  }
  isLoggedIn(){
    return localStorage.getItem('token') !== null;
  }
}
