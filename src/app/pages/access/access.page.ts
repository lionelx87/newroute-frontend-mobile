import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  @ViewChild(IonSegment) ionSegment: IonSegment;

  constructor( ) {  }

  ngOnInit() {
  }

  get loginSelected() {
    if (this.ionSegment) {
      return this.ionSegment.value === 'login';
    }
  }

  get registrySelected() {
    if(this.ionSegment) {
      return this.ionSegment.value === 'registry';
    }
  }

  hasRegistered() {
    this.ionSegment.value = 'login';
  }

}
