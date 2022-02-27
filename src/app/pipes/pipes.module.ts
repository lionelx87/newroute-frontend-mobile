import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeUrlPipe } from './compose-url.pipe';
import { SafeUrlPipe } from './safe-url.pipe';



@NgModule({
  declarations: [ComposeUrlPipe, SafeUrlPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ComposeUrlPipe, SafeUrlPipe
  ]
})
export class PipesModule { }
