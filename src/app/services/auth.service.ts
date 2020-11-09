import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private http: HttpClient
  ) { }

  registerNewUser(user): Observable<any> {
    return this.http.post(environment.backend + '/register', user)
      .pipe(
        catchError( (err) => {
          return throwError(err.error.errors);
        })
      );
  }

}
