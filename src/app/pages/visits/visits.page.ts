import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { Spot } from "src/app/interfaces/spot.interface";
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
})
export class VisitsPage implements OnInit {
  spots: Observable<Spot[]>;
  slideOpts = {
    autoplay: {
      delay: 3000,
    },
  };

  constructor(private visitService: VisitService) { }

  ngOnInit() {
    this.visitService.getVisits().subscribe( (data: any) => {
      const { visits } = data;
      this.spots = of(visits);
    });
  }

}
