import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidations } from '../custom-validations.class';
import { errors } from '../error-messages';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.scss'],
})
export class RegistryFormComponent implements OnInit {

  form: FormGroup;
  errorMessages = errors;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.buildForm();
  }

  ngOnInit() {}

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [ '', [Validators.required] ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', [Validators.required, Validators.minLength(8)] ],
      passwordConfirm: [ '', [Validators.required, Validators.minLength(8)] ],
    }, {
      validator: CustomValidations.matchPassword('password', 'passwordConfirm')
    });
  }

  registerNewUser(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      console.log(this.form.value);
    }
  }

}
