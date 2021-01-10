import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { DIALOG_CONFIG } from './dialog.config';
import { DialogData } from './dialog.model';

@Injectable()
export class DialogService {
  private _config = DIALOG_CONFIG;
  private _dialogRef: MatDialogRef<any>;

  constructor(public _dialog: MatDialog) {}

  open(dialogData: DialogData, isFullScreen?: boolean) {
    dialogData.isFullScreen = isFullScreen;
    const config = this._generateConfig(dialogData, isFullScreen);
    this._dialogRef = this._dialog.open(DialogComponent, config);
  }

  closeDialog() {
    this._dialogRef.close();
  }

  private _generateConfig(dialogData: DialogData, isFullScreen: boolean): any {
    const config = isFullScreen ? this._config.fullScreen : this._config.default;
    config['data'] = dialogData;
    return config;
  }
}
