import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComposeUrlPipe } from './compose-url.pipe';



@NgModule({
  declarations: [ComposeUrlPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ComposeUrlPipe
  ]
})
export class PipesModule { }
