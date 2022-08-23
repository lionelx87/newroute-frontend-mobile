import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  lang: string;

  constructor(private translateService: TranslateService, private settingsService: SettingsService) { }

  async ngOnInit() {
    const settings = await this.settingsService.get();
    this.lang = settings.lang;
  }

  segmentChanged(segmentChanged: CustomEvent) {
    const { value } = segmentChanged.detail;
    this.translateService.use(value);
    this.settingsService.store({ lang: value });
  }

}
