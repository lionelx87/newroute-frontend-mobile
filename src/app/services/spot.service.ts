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

  rate(spot: Spot, rating: number) {
    return this.http.post(
      environment.backend + '/rate',
      { spot: spot.id, valoration: rating },
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.auth.user.token}`)
    });
  }

  check(spot: Spot) {
    return this.http.post(
      environment.backend + '/check',
      { spot: spot.id },
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.auth.user.token}`)
    });
  }

}
