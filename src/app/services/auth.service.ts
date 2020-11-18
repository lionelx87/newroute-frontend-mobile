import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NewUser } from '../interfaces/new-user.interface';
import { UserAuth } from '../interfaces/user-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient
  ) { }

  registerNewUser(user: NewUser): Observable<any> {
    return this.http.post(environment.backend + '/register', user)
      .pipe(
        catchError( (err) => {
          return throwError(err.error.errors);
        })
      );
  }

  login(user: UserAuth) {
    return this.http.post(environment.backend + '/login', user)
      .pipe(
        catchError( (err) => {
          return throwError(err.error.errors);
        })
      );
  }

}
