import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../../interfaces/spot.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() spot: Spot;

  writing = false;

  comment: string;

  constructor() { }

  ngOnInit() {
  }

  sendComment() {
    console.log(this.comment);
  }

}
