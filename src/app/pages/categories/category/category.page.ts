import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Spot } from '../../../interfaces/spot.interface';
import { CategoryService } from '../../../services/category.service';
import { SpotPage } from '../../spot/spot.page';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  spots: Observable<Spot[]>;
  category: string;

  constructor( private activatedRoute: ActivatedRoute, 
               private categoryService: CategoryService,
               private modalCtrl: ModalController) { }

  ngOnInit() {
    // this.activatedRoute.params
    //   .subscribe( params => {
    //     this.spots = this.categoryService.getSpotsForCategory(params.id);
    //   });
    this.category = this.activatedRoute.snapshot.queryParams.category;
    this.spots = this.categoryService.getSpotsForCategory(this.activatedRoute.snapshot.params.id);
  }

  async openSpot(spot: Spot) {
    const modal = await this.modalCtrl.create({
      component: SpotPage,
      componentProps: { spot }
    });

    await modal.present();

  }


}
