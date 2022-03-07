import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { errors } from "../error-messages";
import { CustomValidations } from "../custom-validations.class";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-new-password-form",
  templateUrl: "./new-password-form.component.html",
  styleUrls: ["./new-password-form.component.scss"],
})
export class NewPasswordFormComponent implements OnInit {
  form: FormGroup;
  token: string;
  errorMessages = errors;
  errorMessage: string;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.buildForm();
    this.errorMessage = "";
    this.loading = false;
  }

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => this.token = params['token'] );
  }

  get password() {
    return this.form.get("password");
  }

  get password_confirmation() {
    return this.form.get("password_confirmation");
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        password: ["", [Validators.required, Validators.minLength(8)]],
        password_confirmation: [
          "",
          [Validators.required, Validators.minLength(8)],
        ],
      },
      {
        validator: CustomValidations.matchPassword(
          "password",
          "password_confirmation"
        ),
      }
    );
  }

  sendNewPassword(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.errorMessage = "";
      this.loading = true;
      this.form.value.token = this.token;
      this.auth.newPassword( this.form.value )
        .subscribe( () => {
          this.router.navigate(['/access']);
        }, (err: HttpErrorResponse) => {
          this.errorMessage = err.error.message;
          this.loading = false;
        }, () => this.loading = false);
    }
  }
}
