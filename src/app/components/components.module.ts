import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RegistryFormComponent } from './forms/registry-form/registry-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';



@NgModule({
  declarations: [
    HeaderComponent,
    RegistryFormComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    RegistryFormComponent,
    LoginFormComponent
  ]
})
export class ComponentsModule { }
