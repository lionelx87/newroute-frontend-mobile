import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errors } from '../error-messages';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  errorMessages = errors;
  errorMessage: string;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { 
    this.buildForm();
    this.errorMessage = '';
    this.loading = false;
  }

  ngOnInit() {}

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: [ '', [Validators.required] ],
      password: [ '', [Validators.required] ],
    });
   }

  loginUser(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      this.errorMessage = '';
      this.loading = true;
    }
  }

}
