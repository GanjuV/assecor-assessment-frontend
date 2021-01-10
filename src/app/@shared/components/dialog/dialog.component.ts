import { Component, Inject } from '@angular/core';
import { DialogData } from './dialog.model';
import { DialogSubscribeService } from './dialog-subscribe.service';
import { DIALOG_CONFIG } from './dialog.config';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  title: string;
  secondaryHeader: string;
  instructionalText: string;
  buttons: any;
  isFullScreen: boolean;

  private _config = DIALOG_CONFIG;

  constructor(
    private _dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _dialogSubscribeService: DialogSubscribeService
  ) {
    this._setDisplayConfigs();
  }

  onNoClick(): void {
    this._dialogRef.close();
  }

  submitForm() {
    this._dialogSubscribeService.submitForm();
  }

  private _setDisplayConfigs() {
    if (this.data && this.data.displayConfig) {
      this.title = this.data.displayConfig.title;
      this.secondaryHeader = this.data.displayConfig.secondaryHeader;
      this.instructionalText = this.data.displayConfig.instructionalText;
      this.isFullScreen = this.data.isFullScreen;
      if (!this.data.displayConfig.hideButtons) {
        this.buttons = Object.assign(this._config.defaultButtons, this.data.displayConfig.buttons);
      }
    }
  }
}
