import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../../../services/custom-validation.service';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.scss'],
})
export class RegistryFormComponent implements OnInit {

  formRegistry: FormGroup;

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
    passwordConfirm: [
      { type: 'required', message: 'El campo es requerido' },
      { type: 'minlength', message: 'Debe poseer mínimo 8 caracteres' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidationService
  ) { 
    this.buildFormRegistry();
  }

  ngOnInit() {}

  get nameRegistry() {
    return this.formRegistry.get('name');
  }

  get emailRegistry() {
    return this.formRegistry.get('email');
  }

  get passwordRegistry() {
    return this.formRegistry.get('password');
  }

  get passwordConfirmRegistry() {
    return this.formRegistry.get('passwordConfirm');
  }

  private buildFormRegistry(): void {
    this.formRegistry = this.formBuilder.group({
      name: [ '', [Validators.required] ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(8)] ],
      passwordConfirm: [ '', [Validators.required, Validators.minLength(8)] ],
    }, {
      validator: this.customValidator.MatchPassword('password', 'passwordConfirm')
    });
  }

  registerNewUser(event: Event) {
    event.preventDefault();
    if(this.formRegistry.valid) {
      console.log(this.formRegistry.value);
    }
  }

}
