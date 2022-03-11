import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RegistryFormComponent } from './forms/registry-form/registry-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { ValorationComponent } from './valoration/valoration.component';
import { ResetFormComponent } from './forms/reset-form/reset-form.component';
import { SendCodeFormComponent } from './forms/send-code-form/send-code-form.component';
import { NewPasswordFormComponent } from './forms/new-password-form/new-password-form.component';
import { RatingComponent } from './rating/rating.component';



@NgModule({
  declarations: [
    HeaderComponent,
    RegistryFormComponent,
    LoginFormComponent,
    ResetFormComponent,
    ValorationComponent,
    SendCodeFormComponent,
    NewPasswordFormComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    RegistryFormComponent,
    LoginFormComponent,
    ResetFormComponent,
    ValorationComponent,
    SendCodeFormComponent,
    NewPasswordFormComponent,
    RatingComponent
  ]
})
export class ComponentsModule { }
