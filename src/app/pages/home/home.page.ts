import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  get userLogged() { return this.auth.isLogin(); }

  get userName() { return this.auth.user.name; }

  get profilePhoto() { return this.auth.user.profile_photo_url; }

  constructor(private auth: AuthService) {}

}
