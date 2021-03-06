import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { AppHomeComponent } from './app-home.component';

@NgModule({
  imports: [CommonModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule, ReactiveFormsModule],
  declarations: [AppHomeComponent],
  providers: [],
})
export class AppHomeModule {}
