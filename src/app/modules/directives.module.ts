import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from 'src/app/shared/directives/highlight.directive';



@NgModule({
  declarations: [HighlightDirective],
  imports: [
    CommonModule
  ],
  exports : [HighlightDirective]
})
export class DirectivesModule { }
