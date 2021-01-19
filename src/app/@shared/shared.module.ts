import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ChipDataService } from './services';
import { DialogComponent, DialogService, DialogSubscribeService } from './components/dialog';
import { FormShellComponent } from './components/form-shell/form-shell.component';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent, ChipsComponent, DialogComponent, FormShellComponent],
  exports: [LoaderComponent, ChipsComponent, DialogComponent, FormShellComponent],
  providers: [ChipDataService, DialogService, DialogSubscribeService],
  entryComponents: [DialogComponent],
})
export class SharedModule {}
