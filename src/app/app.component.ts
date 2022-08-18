import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ItemMenu } from './interfaces/item-menu.interface';
import { menu_es, menu_en } from '../assets/menu';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  menuSelected: ItemMenu[];
  app: string;
  version: string;
  supportLanguages = [ "en", "es" ];

  get userLogged() { return this.auth.isLogin(); }

  get menu() { return this.menuSelected; }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private translateService: TranslateService
  ) {
    this.initializeApp();
    this.app = environment.app;
    this.version = environment.version;
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang("en");

    const browserlang = this.translateService.getBrowserLang();
    // this.translateService.use(browserlang);
    this.translateService.use("es");
    this.menuSelected = menu_es;
    // setTimeout(() => {
    //   this.menuSelected = menu_en;
    // }, 10000);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() { this.auth.logout(); }

}
