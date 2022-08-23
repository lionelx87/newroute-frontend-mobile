import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Spot } from "../interfaces/spot.interface";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class VisitService {
  constructor(private http: HttpClient, private auth: AuthService, private translateService: TranslateService) {}

  register(visits: number[]) {
    return this.http.post(
      environment.backend + "/visits",
      { visits: JSON.stringify(visits) },
      {
        headers: new HttpHeaders().append(
          "Authorization",
          `Bearer ${this.auth.user.token}`
        ),
      }
    );
  }

  getVisits() {
    const params = new HttpParams().set("lang", this.translateService.currentLang);
    return this.http.get<Spot[]>(environment.backend + "/visits", {
      headers: new HttpHeaders().append(
        "Authorization",
        `Bearer ${this.auth.user.token}`
      ),
      params
    });
  }
}
