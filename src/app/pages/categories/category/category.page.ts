import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Spot } from '../../../interfaces/spot.interface';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  spots: Observable<Spot[]>;

  constructor( private activatedRoute: ActivatedRoute, private categoryService: CategoryService ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe( params => {
        this.spots = this.categoryService.getSpotsForCategory(params.id);
      });
  }

}
