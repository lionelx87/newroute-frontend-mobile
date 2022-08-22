import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../environments/environment';
import { Spot } from '../interfaces/spot.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient, private translateService: TranslateService ) { }

  getCategories() {
    const params = new HttpParams().set("lang", this.translateService.currentLang);
    return this.http.get<Category[]>(environment.backend + environment.endpoints.categories, { params });
  }

  getSpotsForCategory(categoryId: number) {
    const params = new HttpParams().set("lang", this.translateService.currentLang);
    return this.http.get<Spot[]>(environment.backend + `/categories/${categoryId}/spots`, { params });
  }

}
