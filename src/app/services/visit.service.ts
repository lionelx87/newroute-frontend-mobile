import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Spot } from "../interfaces/spot.interface";

@Injectable({
  providedIn: "root",
})
export class VisitService {
  constructor(private http: HttpClient, private auth: AuthService) {}

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
    return this.http.get<Spot[]>(environment.backend + "/visits", {
      headers: new HttpHeaders().append(
        "Authorization",
        `Bearer ${this.auth.user.token}`
      ),
    });
  }
}
