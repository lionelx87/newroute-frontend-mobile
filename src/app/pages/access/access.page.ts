import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  @ViewChild(IonSegment) ionSegment: IonSegment;
  formLogin: FormGroup;

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

  // Login
  get emailLogin() {
    return this.formLogin.get('name');
  }

  get passwordLogin() {
    return this.formLogin.get('password');
  }

  private buildFormLogin(): void { }

  loginUser() {}

  hasRegistered() {
    this.ionSegment.value = 'login';
  }

}
