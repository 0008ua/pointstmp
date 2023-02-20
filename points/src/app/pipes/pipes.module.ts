import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorExtractorPipe } from './error-extractor.pipe';

@NgModule({
  declarations: [ErrorExtractorPipe],
  imports: [CommonModule],
  exports: [ErrorExtractorPipe],
})
export class PipesModule {}
