import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Spot, SpotRecommended, SpotValorated } from '../interfaces/spot.interface';
import { AuthService } from './auth.service';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private translateService: TranslateService
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

  comment(spot: Spot, comment: string) {
    return this.http.post(
      environment.backend + '/comment',
      { spot: spot.id, message: comment },
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.auth.user.token}`)
    });
  }

  getOpinions(spot: Spot) {
    return this.http.post(
      environment.backend + '/opinions',
      { spot: spot.id },
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.auth.user.token}`)
    });
  }

  getRecommendations() {
    const params = new HttpParams().set("lang", this.translateService.currentLang);
    return this.http.get<SpotRecommended[]>( environment.backend + '/recommendations', { params });
  }

  getValorations() {
    const params = new HttpParams().set("lang", this.translateService.currentLang);
    return this.http.get<SpotValorated[]>( environment.backend + '/valorations', { params } );
  }

  getSpots() {
    return this.http.get<Spot[]>( environment.backend + '/spots' );
  }

}
