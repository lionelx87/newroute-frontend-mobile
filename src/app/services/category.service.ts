import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../environments/environment';
import { Spot } from '../interfaces/spot.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }

  getCategories() {
    return this.http.get<Category[]>(environment.backend + environment.endpoints.categories);
  }

  getSpotsForCategory(categoryId: number) {
    return this.http.get<Spot[]>(environment.backend + `/categories/${categoryId}/spots`);
  }

}
