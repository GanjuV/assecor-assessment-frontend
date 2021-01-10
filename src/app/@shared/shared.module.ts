import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ChipDataService } from './services';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, ChipsComponent],
  exports: [LoaderComponent, ChipsComponent],
  providers: [ChipDataService],
})
export class SharedModule {}
