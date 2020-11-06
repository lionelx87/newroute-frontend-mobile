import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  @ViewChild(IonSegment) ionSegment: IonSegment;

  formRegistry: FormGroup;
  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder) { this.buildFormRegistry(); }

  errorMessages = {
    name: [ 
      { type: 'required', message: 'El campo es requerido' }
    ],
    email: [ 
      { type: 'required', message: 'El campo es requerido' },
      { type: 'email', message: 'Debe ser un correo válido' },
    ],
    password: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'minlength', message: 'Debe poseer mínimo 8 caracteres' },
    ],
    passwordConfirmed: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'minlength', message: 'Debe poseer mínimo 8 caracteres' },
    ]

  };

  ngOnInit() {
  }

  get loginSelected() {
    if(this.ionSegment) {
      return this.ionSegment.value === 'login';
    }
  }

  get registrySelected() {
    if(this.ionSegment) {
      return this.ionSegment.value === 'registry';
    }
  }

  // Registry
  get nameRegistry() {
    return this.formRegistry.get('name');
  }

  get emailRegistry() {
    return this.formRegistry.get('email');
  }

  get passwordRegistry() {
    return this.formRegistry.get('password');
  }

  get passwordConfirmedRegistry() {
    return this.formRegistry.get('passwordConfirmed');
  }

  // Login
  get emailLogin() {
    return this.formLogin.get('name');
  }

  get passwordLogin() {
    return this.formLogin.get('password');
  }

  private buildFormRegistry(): void {
    this.formRegistry = this.formBuilder.group({
      name: [ '', [Validators.required] ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(8)] ],
      passwordConfirmed: [ '', [Validators.required, Validators.minLength(8)] ],
    });
  }

  private buildFormLogin(): void { }

  registerNewUser(event: Event) {
    event.preventDefault();
    if(this.formRegistry.valid) {
      console.log(this.formRegistry.value);
    }
  }

  loginUser() {}

}
