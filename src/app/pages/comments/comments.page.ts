import { Component, Input, OnInit } from '@angular/core';
import { Spot } from '../../interfaces/spot.interface';
import { SpotService } from '../../services/spot.service';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  @Input() spot: Spot;

  writing = false;

  sending = false;

  comment: string;

  get userLogged() { return this.auth.isLogin(); }

  constructor( 
    private spotService: SpotService,
    private auth: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {  }

  sendComment() {
    if(this.comment.trim().length > 0) {
      this.sending = true;
      this.spotService.comment(this.spot, this.comment.trim())
        .subscribe(resp => {
          this.writing = false;
          this.sending = false;
          this.spot.comments.unshift({
            user: {
              profile_photo_url: this.auth.user.profile_photo_url,
              name: this.auth.user.name
            },
            message: this.comment,
            created_at: 'ahora'
          });
          this.comment = '';
        });
    }
  }

  closeComments() {
    this.modalCtrl.dismiss();
  }

}
