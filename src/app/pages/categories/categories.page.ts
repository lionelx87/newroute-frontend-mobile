import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: Observable<Category[]>;

  constructor( private categoriesServices: CategoryService ) { }

  ngOnInit() {
    this.categories = this.categoriesServices.getCategories();
  }

}
