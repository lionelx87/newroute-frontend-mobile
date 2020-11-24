import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../../interfaces/spot.interface';
import { SpotService } from '../../services/spot.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() spot: Spot;

  writing = false;

  comment: string;

  constructor( private spotService: SpotService ) { }

  ngOnInit() {
  }

  sendComment() {
    if(this.comment.trim().length > 0) {
      this.spotService.comment(this.spot, this.comment.trim())
        .subscribe(resp => {
          console.log(resp);
          this.writing = false;
        });
    }
  }

}
