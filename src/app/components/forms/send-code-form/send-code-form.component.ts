import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { errors } from "../error-messages";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { ResponseToken } from "src/app/interfaces/user.interface";

@Component({
  selector: "app-send-code-form",
  templateUrl: "./send-code-form.component.html",
  styleUrls: ["./send-code-form.component.scss"],
})
export class SendCodeFormComponent implements OnInit {
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

  get code() {
    return this.form.get("code");
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      code: ["", [Validators.required]],
    });
  }

  sendCode(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.errorMessage = "";
      this.loading = true;
      this.auth.resetPasswordToken(this.form.value)
        .subscribe( (resp: ResponseToken) => {
          this.route.navigate(["/new-password", resp.token]);
        }, (err: HttpErrorResponse) => {          
          this.errorMessage = err.error.message;
          this.loading = false
        }, () => this.loading = false);
    }
  }
}
