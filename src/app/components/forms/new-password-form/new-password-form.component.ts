import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { errors } from "../error-messages";
import { CustomValidations } from '../custom-validations.class';
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss'],
})
export class NewPasswordFormComponent implements OnInit {
  form: FormGroup;
  errorMessages = errors;
  errorMessage: string;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private route: Router) {
    this.buildForm();
    this.errorMessage = '';
    this.loading = false;
   }

  ngOnInit() {}

  get password() {
    return this.form.get('password');
  }

  get password_confirmation() {
    return this.form.get('password_confirmation');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      password: [ '', [Validators.required, Validators.minLength(8)] ],
      password_confirmation: [ '', [Validators.required, Validators.minLength(8)] ],
    }, {
      validator: CustomValidations.matchPassword('password', 'password_confirmation')
    });
  }

  sendNewPassword(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      this.errorMessage = '';
      this.loading = true;
      console.log('enviando new password...');
    }
  }

}
