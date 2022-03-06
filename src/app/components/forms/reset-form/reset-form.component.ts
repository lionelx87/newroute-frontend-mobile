import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { errors } from "../error-messages";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-reset-form",
  templateUrl: "./reset-form.component.html",
  styleUrls: ["./reset-form.component.scss"],
})
export class ResetFormComponent implements OnInit {
  form: FormGroup;
  errorMessages = errors;
  errorMessage: string;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private auth: AuthService
  ) {
    this.buildForm();
    this.errorMessage = "";
    this.loading = false;
  }

  ngOnInit() {}

  get email() {
    return this.form.get("email");
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  resetPassword(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.errorMessage = "";
      this.loading = true;
      this.auth.forgotPassword(this.form.value)
        .subscribe( resp => {
          this.toSendCode();
        }, (err: HttpErrorResponse) => {
          this.errorMessage = err[0];
          this.loading = false;
        }, () => this.loading = false);
    }
  }

  toSendCode() {
    this.route.navigate(["/send-code"]);
  }
}
