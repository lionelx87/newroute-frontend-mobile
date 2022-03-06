import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { errors } from "../error-messages";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-send-code-form',
  templateUrl: './send-code-form.component.html',
  styleUrls: ['./send-code-form.component.scss'],
})
export class SendCodeFormComponent implements OnInit {
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

  get code() {
    return this.form.get('code');
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      code: [ '', [ Validators.required ] ],
    });
  }

  sendCode(event: Event) {
    event.preventDefault();
    if(this.form.valid) {
      this.errorMessage = '';
      this.loading = true;
      console.log('enviando código...');
    }
  }

}
