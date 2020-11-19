import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserRegister, UserLogin, UserAuth } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = null;

  constructor( private http: HttpClient,
               private router: Router,
               private storage: StorageService
  ) { }

  isLogin() {
    return this.user !== null;
  }

  registerNewUser(user: UserRegister): Observable<any> {
    return this.http.post(environment.backend + '/register', user)
      .pipe(
        catchError( (err) => {
          return throwError(err.error.errors);
        })
      );
  }

  login(user: UserLogin) {
    return this.http.post(environment.backend + '/login', user)
      .pipe(
        map(
          (user: UserAuth) => {
            this.user = user;
            this.router.navigate(['/home']);
            this.storage.setUser(user);
            return user;
          }
        ),
        catchError( (err) => {
          return throwError(err.error.errors);
        })
      );
  }

  canActivate() {
    return !this.isLogin();
  }

}
