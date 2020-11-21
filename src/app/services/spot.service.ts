import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Spot } from '../interfaces/spot.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  recommend(spot: Spot) {
    return this.http.post(
      environment.backend + '/recommend',
      { spot: spot.id },
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.auth.user.token}`)
    });
  }

}
