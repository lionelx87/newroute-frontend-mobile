import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.use("es");
  }

  segmentChanged(segmentChanged: CustomEvent) {
    const { value } = segmentChanged.detail;
    this.translateService.use(value);
  }

}
